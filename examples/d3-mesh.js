(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, (function (exports) { 'use strict';

// Public - create a new Cell
//
// parent - the mesh containing this cell
// indices - a 2-element array
//
// Returns a new Cell
var Cell = function(parent, indices) {
    this.parent = parent;
    this.i = indices[0];
    this.j = indices[1];
};

Cell.prototype.x = function() {
    return this.parent.pickXs(this.i);
};

Cell.prototype.y = function() {
    return this.parent.pickYs(this.j);
};

Cell.prototype.d = function() {
    return this.parent.pickData(this.i, this.j);
};

Cell.prototype.shape = function() {
    var x = this.x();
    var y = this.y();
    return {
        x: x.b - x.a,
        y: y.b - y.a
    }
};

function dim() {
  var domain = [0, 1],
      shape = function(x) { return 1; },
      id = null;

  // Public - divide dimension into divs elements
  //
  // divs - dimension divisions
  //
  // Returns an array of boundary points
  function dimension(divs) {
    return nodesToRanges(
      coverDomain(
        shapeToNodes(
          makeNodes(divs)
        )
      )
    )
  }

  // Private - convert shape variable to an array
  //
  // len - desired length
  //
  // Returns an array of len numbers
  function makeNodes(len) {
    if (Array.isArray(shape)) {
      return expand(shape, len);
    } else if (typeof shape == "function") {
      return Array.apply(null, Array(len)).map(shape);
    } else {
      throw("shape must be an Array or a function")
    }
  }

  // Private - expand the shape to len length
  //
  // blueprint - an array to expand
  // len - desired length
  //
  // Returns a len-element array of numbers
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

  // Private - convert shape to nodes (compute prefix sum)
  //
  // shape - an array of widths of each division
  //
  // Returns an array of shape.length + 1 nodes
  function shapeToNodes(shape) {

    function nextNode(nodes, shape) {
      if (shape.length == 0) {
        return nodes;
      } else {
        return nextNode(push(nodes, last(nodes) + shape.shift()), shape)
      }
    }

    function push(arr, el) {  //TODO: use concat instead
      arr.push(el);
      return arr;
    }

    function last(arr) {
      return arr[arr.length - 1];
    }

    return nextNode([0], shape);
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

  // Public - set or get id attribute
  //
  // _ - new id value (optional)
  //
  // Returns id or dimension
  dimension.id = function(_) {
    return arguments.length ? (
      id = _,
      dimension
    ) : id;
  };

  return dimension;
}

function mesh() {
  var mesh = {};

  var x = dim().id("x"),
      y = dim().id("y"),
      xs = [{ 'a': 0, 'b': 1 }],
      ys = [],
      data = [[]];

  //TODO: fix indentation (damn vim :/)

  // Public - map data to a 2D array of cells
  //
  // Returns a 2D array of Cells
  mesh.matrix = function() {

      function mapColumn(col, i) {
          return col.map(
              function(data, j) {
                  return new Cell(mesh, [i, j]);
              }
          );
      }

      return data.map(mapColumn);
  }

  // Public - map data to a 1D array
  //
  // Returns a 1D array of size.x * size.y Cells
  mesh.flat = function() {

      function foldColumn(acc, col, i) {
          var mappedCol =  col.map(
              function(data, j) {
                  return new Cell(mesh, [i, j]);
              }
          );

          return acc.concat(mappedCol);
      }

      return data.reduce(
          foldColumn,
          []
      );
  }

  // Public - get a Cell by indices
  //
  // i - x index
  // j - y index
  // d - data
  //
  // Returns a Cell
  mesh.pick = function(i, j, d) {
     d = typeof d == "undefined" ? null : d;
     var size = mesh.size();

     if (i < size.x && j < size.y) {
        // (i, j) fit within size - just get the cell
        return new Cell(mesh, [i, j]);
     } else {
        // out of bounds -> modify data to contain (i, j)

        // insert rows first
        for (var rowIndex = size.y; rowIndex <= j; ++rowIndex) {
            mesh.insertRow([]);
        }

        // now columns
        for (var colIndex = size.x; colIndex <= i; ++colIndex) {
            mesh.insertCol([]);
        }
     }

     data[i][j] = d;

     return new Cell(mesh, [i, j]);
  }

  // Public - insert a new column
  // 
  // colData - 1D array of length <= size.y
  // colIndex - where to put the array (default: append to the end)
  mesh.insertCol = function(colData, colIndex) {
     var size = mesh.size();
     colIndex = typeof colIndex == "undefined" ? size.x : colIndex;

     if (colIndex > size.x || colData.length > size.y) {
         throw "Weird insertion. Try mesh.data() instead"
     } else {
         xs = x(size.x + 1);
         colData = fillArray(colData, size.y);
         data.splice(colIndex, 0, colData);
     }

     return mesh;
  }

  // Public - insert a new row
  // 
  // rowData - 1D array of length <= size.x
  // rowIndex - where to put the array (default: append to the end)
  mesh.insertRow = function(rowData, rowIndex) {
     var size = mesh.size();
     rowIndex = typeof rowIndex == "undefined" ? size.y : rowIndex;

     if (rowIndex > size.y || rowData.length > size.x) {
         throw "Weird insertion. Try mesh.data() instead"
     } else {
         ys = y(size.y + 1);
         rowData = fillArray(rowData, size.x);
         
         // Insert an element into each column
         for (var i in data) {
             var col = data[i];
             var rowEl = rowData[i];
             col.splice(rowIndex, 0, rowEl);
         }

     }

     return mesh;
  }

  // Public - get current size of mesh
  //
  // Returns an object { x: int, y: int }
  mesh.size = function() {
    return { x: data.length, y: data[0].length };
  } 
  
  // Public - pick xs by index
  mesh.pickXs = function(index) {
      return xs[index];
  }

  // Public - pick ys by index
  mesh.pickYs = function(index) {
      return ys[index];
  }

  // Public - pick data by indices
  mesh.pickData = function(i, j) {
      return data[i][j];
  }

  // Public - set or get data
  // 
  // _ - new data (optional)
  //
  // Returns dimension or mesh
  //
  // Note: setter may store a modified value
  mesh.data = function(_) {
    return arguments.length ? (
      recompute(_),
      mesh
    ) : data;
  };

  // Public - set or get x attribute
  //
  // _ - new x value (optional)
  //
  // Returns dimension or mesh
  mesh.x = function(_) {
    return arguments.length ? (
      x = _,
      mesh
    ) : x;
  };

  // Public - set or get y attribute
  //
  // _ - new y value (optional)
  //
  // Returns dimension or mesh
  mesh.y = function(_) {
    return arguments.length ? (
      y = _,
      mesh
    ) : y;
  };

  // Private - get size of the enclosing array
  //
  // Note: designed to be used with a non-normalized 2D array,
  // where cols may differ in lengths
  function enclosingSize(arr) {
    var x = arr.length;
    var y = Math.max.apply(
        0,
        arr.map(function(col) { return col.length; } )
    );
    return { x: x, y: y };
  }

  // Private - build an enclosing array from data
  //
  // arr - a 2D array (an array of columns)
  // size - an object { x: int, y: int }
  //
  // Returns a new 2d array
  function enclose(arr, size) {
    return arr.map(
        function(col) { return fillArray(col, size.y); }
    ); 
  }

  // Private - fill an array with nulls
  function fillArray(arr, targetLen) {
      var fill = new Array(targetLen - arr.length).fill(null);
      return arr.concat(fill);
  }

  // Private - comopute all internal params to fit data
  //
  // arr - a 2D array
  function recompute(arr) {
     var size = enclosingSize(arr);

     data = enclose(arr, size);
     xs = x(size.x);
     ys = y(size.y);
  }

  return mesh;
};

exports.mesh = mesh;
exports.dimension = dim;
exports.Cell = Cell;

Object.defineProperty(exports, '__esModule', { value: true });

})));