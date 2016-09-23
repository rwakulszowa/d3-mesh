(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function Cell(nodes, data, dims) {
    dims = dims || "xyz";

    for (var i in nodes) {
      this[dims[i]] = nodes[i];
    }
    
    this['data'] = data;
  }

  Cell.prototype = {
    constructor: Cell
  };

  function dim() {
    var domain = [0, 1],
        shape = [1, 1, 1, 1];

    // Public - divide dimension into divs elements
    //
    // divs - dimension divisions
    //
    // Returns an array of boundary points
    function dimension(divs) {
      return nodesToRanges(
        coverDomain(
          sizesToNodes(
            expand(shape, divs)
          )
        )
      )
    }

    // Private - expand the shape to divs length
    //
    // blueprint - an array to expand
    // len - desired length
    //
    // Returns a divs-element array of numbers
    function expand(blueprint, len) {
      if (blueprint.length == 0) {
        throw("empty blueprint");
      }

      function repeat(res) {
        if (res.length == len) {
          return res
        } else {
          return repeat(res.concat(blueprint.slice(0, len - res.length)));
        }
      }

      return repeat([]);
    }

    // Private - convert sizes to nodes (compute prefix sum)
    //
    // sizes - an array of widths of each division
    //
    // Returns an array of sizes.length + 1 nodes
    function sizesToNodes(sizes) {

      function nextNode(nodes, sizes) {
        if (sizes.length == 0) {
          return nodes;
        } else {
          return nextNode(push(nodes, last(nodes) + sizes.shift()), sizes)
        }
      }

      function push(arr, el) {  //TODO: use concat instead
        arr.push(el);
        return arr;
      }

      function last(arr) {
        return arr[arr.length - 1];
      }

      return nextNode([0], sizes);
    }

    // Private - transform nodes to cover domain
    //
    // nodes - an array of nodes
    //
    // Returns an array of nodes.length nodes spanning over domain
    function coverDomain(nodes) {
      var domainLength = domain[1] - domain[0],
          min = Math.min.apply(Number.MAX_VALUE, nodes),
          max = Math.max.apply(null, nodes),
          diff = max - min;

      return nodes.map(function(n) {
        return domain[0] + domainLength * (n - min) / diff;
      })
    }

    // Private - convert nodes to ranges
    //
    // nodes - an array of nodes
    //
    // Returns an array of nodes.length +1 objects {'a':..., 'b': ...}
    function nodesToRanges(nodes) {

      function build(nodes, ranges) {
        if (nodes.length <= 1) {
          return ranges;
        } else {
          return build(
            nodes.slice(1, nodes.length),
            ranges.concat({ 'a': nodes[0], 'b': nodes[1] })
          )
        }
      }

      return build(nodes, []);
    }

    // Public - set or get domain attribute
    //
    // _ - new domain value (optional)
    //
    // Returns domain or dimension
    dimension.domain = function(_) {
      return arguments.length ? (
        domain = _,
        dimension
      ) : domain;
    };

    // Public - set or get shape attribute
    //
    // _ - new shape value (optional)
    //
    // Returns shape or dimension
    dimension.shape = function(_) {
      return arguments.length ? (
        shape = _,
        dimension
      ) : shape;
    };

    return dimension;
  }

  function mesh() {
    var x = dim(),
        y = dim();

    //TODO: utils for irregular mesh (merged cells) - empty array cells? - map omits them
    //NOTE: dimension animations can be handled by moving / passing / shuffling data
    //TODO: allow other forms of digging - flatten cells, wrap all rows in Cell, swap x/y...

    function mesh(data) {

      function dig(data, dims, nodes) {
        if (dims.length == 0) {
          return new Cell(nodes, data);
        } else {
          // var nextNodes = [x, y][nodes.length](data);
          // return data.map(function(el, i) {
          //   return _dig(el, nodes.concat( {'a': nextNodes[i], 'b': nextNodes[i+1] } ), depth);
          // });
          // console.log(data);
          var nodes_ = dims[0](data.length);
          console.log(nodes_, data);
          return data.map(function(d, i) {
            return dig(d, dims.slice(1, dims.length), nodes.concat(nodes_[i]));
          })
        }
      }

      return dig(data, [x, y], []);
    }

    mesh.x = function(_) {
      return arguments.length ? (
        x = _,
        mesh
      ) : x;
    };

    mesh.y = function(_) {
      return arguments.length ? (
        y = _,
        mesh
      ) : y;
    };

    return mesh;
  };

  exports.mesh = mesh;
  exports.dimension = dim;
  exports.Cell = Cell;

}));