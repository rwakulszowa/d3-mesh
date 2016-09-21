import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var x = dimension.fromSizes([1, 1]),
      y = dimension.fromSizes([1, 1]);

  //TODO: utils for irregular mesh (merged cells) - empty array cells? - map omits them
  //NOTE: dimension animations can be handled by moving / passing / shuffling data
  //TODO: do not pass mesh size, just the data

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

export default mesh;
