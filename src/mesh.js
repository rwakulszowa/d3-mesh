import Cell from "./cell";
import dimension from "./dimension";

export default function() {
  var dims = [
    dimension.fromSizes([0, 2]),
    dimension.fromSizes([0, 2])
  ];

  //TODO: utils for irregular mesh (merged cells) - empty array cells? - map omits them
  //NOTE: dimension animations can be handled by moving / passing / shuffling data
  //TODO: multiple getters: flat, grouped by each dimension
  //TODO: easier creation - interface with predefined regular mesh
  //TODO: hardcode 2D dimension

  function mesh(data) {
    return _dig(data, [], dims.length);
  }

  function _dig(data, nodes, depth) {
    if (nodes.length == depth) {
      return new Cell(nodes, data);
    } else {
      var nextNodes = dims[nodes.length].expand();
      return data.map(function(el, i) {
        return _dig(el, nodes.concat( {'a': nextNodes[i], 'b': nextNodes[i+1] } ), depth);
      });
    }
  }

  mesh.dims = function(_) {
    return arguments.length ? (
      dims = _,
      mesh
    ) : dims;
  };

  return mesh;
};
