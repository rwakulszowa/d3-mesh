export default function() {
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
