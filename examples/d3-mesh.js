(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function Cell(nodes, data) {
    for (var i in nodes) {
      this['d' + i] = nodes[i];
    }
    this['data'] = data;
  }

  Cell.prototype = {
    constructor: Cell
  };

  function dim(nodes) {
    var dimension = {},
        domain = [0, 1];

    dimension.domain = function(_) {
      return arguments.length ? (
        domain = _,
        dimension
      ) : domain;
    };

    dimension.nodes = function(_) {
      return arguments.length ? (
        dimension
      ) : nodes;
    }

    dimension.expand = function() {
      var domainLength = domain[1] - domain[0],
          min = Math.min.apply(Number.MAX_VALUE, nodes),
          max = Math.max.apply(null, nodes),
          diff = max - min;

      return nodes.map(function(n) {
        return domain[0] + (n - min) / diff * domainLength;
      })
    };

    return dimension;
  }

  dim.fromFunction = function(fun, divs) {
    var nodes = new Array(divs + 1);
    for (var i = 0; i < nodes.length; ++i) { nodes[i] = fun(i); };
    return dim(nodes);
  }

  dim.fromSizes = function(sizes) {
    var nodes = new Array(sizes.length + 1);
    nodes[0] = 0;
    for (var i = 0; i < sizes.length; ++i) { nodes[i + 1] = nodes[i] + sizes[i]; };
    return dim(nodes);
  }

  dim.fromNodes = dim;

  function mesh() {
    // var dims = [
    //   dimension.fromSizes([1, 1]),
    //   dimension.fromSizes([1, 1])
    // ];
    var x = dim.fromSizes([1, 1]),
        y = dim.fromSizes([1, 1]);

    //TODO: utils for irregular mesh (merged cells) - empty array cells? - map omits them
    //NOTE: dimension animations can be handled by moving / passing / shuffling data
    //TODO: multiple getters: flat, grouped by each dimension
    //TODO: easier creation - interface with predefined regular mesh

    function mesh(data) {
      return _dig(data, [], 2);
    }

    function _dig(data, nodes, depth) {
      if (nodes.length == depth) {
        return new Cell(nodes, data);
      } else {
        var nextNodes = [x, y][nodes.length].expand();
        return data.map(function(el, i) {
          return _dig(el, nodes.concat( {'a': nextNodes[i], 'b': nextNodes[i+1] } ), depth);
        });
      }
    }

    // mesh.dims = function(_) {
    //   return arguments.length ? (
    //     dims = _,
    //     mesh
    //   ) : dims;
    // };

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