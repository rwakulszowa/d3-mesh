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

  function Dimension(divs, nodes) {
    if (typeof nodes != "function" && nodes.length != divs + 1) {  //TODO: if nodes is an array, skip divs argument
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
    var dims = [];

    //TODO: utils for irregular grids (merged cells) - empty array cells? - map omits them
    //TODO: utils for easy resizing - array of keypoints? (regular divisions by default, allow resizing)

    //TODO: cell.js, dimension.js -> grid is just a set of dimensions with no order (treat each dimension the same)
    //NOTE: dimension animations can be handled by moving passing / shuffling data
    //NOTE: data structure will always be the same / regular
    //TODO: multiple getters: flat, grouped by each dimension

    function grid(data) {
      return _dig(data, [], dims.length);
    }

    function _dig(data, nodes, depth) {
      if (nodes.length == depth) {
        return new Cell(nodes, data);
      } else {
        var nextNodes = dims[nodes.length].getNodes();
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
  exports.Dimension = Dimension;
  exports.Cell = Cell;

}));