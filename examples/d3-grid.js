(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_grid = global.d3_grid || {})));
}(this, function (exports) { 'use strict';

  function Dimension(divs, nodes) {
    if (typeof nodes != "function" && nodes.length != divs + 1) {
      throw "Nodes must be a callable or an array of length divs + 1"
    }
    this.divs = divs;
    this.nodes = nodes;
  }

  Dimension.prototype = {
    constructor: Dimension,

    getNodes: function() {
      var nodes = typeof this.nodes == "function" ? (
        _computeNodes(this)
      ) : this.nodes;
      var max = Math.max.apply(null, nodes);
      for (var i in nodes) { nodes[i] /= max; };
      return nodes;
    }
  };

  function _computeNodes(d) {
    var temp = new Array(d.divs + 1);
    for (var i=0; i < temp.length; ++i) { temp[i] = d.nodes(i / d.divs); };
    return temp;
  }

  function grid() {
    var dims = [1],  // grid dimensions
        nodes = [function(x) { return x; }];  // start- and endpoints for each cell; an array of arrays or functions

    //TODO: utils for irregular grids (merged cells) - empty array cells? - map omits them
    //TODO: utils for easy resizing - array of keypoints? (regular divisions by default, allow resizing)

    //TODO: cell.js, dimension.js -> grid is just a set of dimensions with no order (treat each dimension the same)
    //NOTE: dimension animations can be handled by moving passing / shuffling data
    //NOTE: data structure will always be the same / regular
    //TODO: multiple getters: flat, grouped by each dimension

    function grid(data) {}

    grid.dims = function(_) {
      return arguments.length ? (
        dims = _,
        grid
      ) : dims;
    };

    grid.nodes = function(_) {
      return arguments.length ? (
        nodes = _,
        grid
      ) : nodes;
    };

    return grid;
  };

  function Cell(nodes) {
    for (var i in nodes) {
      var n = nodes[i];
      if (n != undefined && n != null) {
        this['d' + i] = n;
      }
    }
  }

  Cell.prototype = {
    constructor: Cell
  };

  exports.dimension = Dimension;
  exports.Grid = grid;
  exports.Cell = Cell;

}));