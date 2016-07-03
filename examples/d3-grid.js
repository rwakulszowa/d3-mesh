(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_grid = global.d3_grid || {})));
}(this, function (exports) { 'use strict';

  function Cell(nodes, data) {
    for (var i in nodes) {
      var n = nodes[i];
      if (n != undefined && n != null) {
        this['d' + i] = n;
      }
    }
    this['data'] = data;
  }

  Cell.prototype = {
    constructor: Cell
  };

  function dimension(nodes, divs) {
    return new Dimension(nodes, divs);
  }

  function Dimension(nodes, divs) {
    this.nodes = nodes;
    if (Array.isArray(nodes)) {
      this.divs = nodes.length - 1;
    } else if (typeof nodes == "function" && divs != undefined) {
      this.divs = divs;
      this.compute();
    } else {
      throw "Bad arguments";
    }
    this.normalize();
  };

  Dimension.prototype = {
    constructor: Dimension,

    compute: function() {
      var temp = new Array(this.divs + 1);
      for (var i=0; i < temp.length; ++i) { temp[i] = this.nodes(i / this.divs); };
      this.nodes = temp;
    },

    normalize: function() {
     var max = Math.max.apply(null, this.nodes);
     for (var i in this.nodes) { this.nodes[i] /= max; };
    }

  };

  function grid() {
    var dims = [];

    //TODO: utils for irregular grids (merged cells) - empty array cells? - map omits them

    //NOTE: dimension animations can be handled by moving passing / shuffling data
    //NOTE: data structure will always be the same / regular
    //TODO: multiple getters: flat, grouped by each dimension
    //TODO: dimension - get single element by index
    //TODO: expand method (from 0-1 domain to domain provided by user)

    function grid(data) {
      return _dig(data, [], dims.length);
    }

    function _dig(data, nodes, depth) {
      if (nodes.length == depth) {
        return new Cell(nodes, data);
      } else {
        var nextNodes = dims[nodes.length].nodes;
        return data.map(function(el, i) {
          return _dig(el, nodes.concat( {'a': nextNodes[i], 'b': nextNodes[i+1] } ), depth);
        });
      }
    }

    grid.dims = function(_) {
      return arguments.length ? (
        dims = _,
        grid
      ) : dims;
    };

    return grid;
  };

  exports.grid = grid;
  exports.dimension = dimension;
  exports.Cell = Cell;

}));