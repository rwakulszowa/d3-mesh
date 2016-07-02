import Cell from "./cell";
import Dimension from "./dimension";

export default function() {
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
