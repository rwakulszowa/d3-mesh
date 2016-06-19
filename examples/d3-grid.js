(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_grid = global.d3_grid || {})));
}(this, function (exports) { 'use strict';

  function grid() {
    var dims = [1],  // grid dimensions
        nodes = [function(x) { return x; }];  // start- and endpoints for each cell; an array of arrays or functions

    //TODO: utils for irregular grids (merged cells) - empty array cells? - map omits them
    //TODO: utils for easy resizing - array of keypoints? (regular divisions by default, allow resizing)

    //TODO: cell.js, dimension.js -> grid is just a set of dimensions with no order (treat each dimension the same)
    //NOTE: dimension animations can be handled by moving passing / shuffling data
    //NOTE: data structure will always be the same / regular

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

  exports.grid = grid;

}));