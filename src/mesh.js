import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var x = dimension(),
      y = dimension();

  //TODO: utils for irregular mesh (merged cells) - empty array cells? - map omits them
  //NOTE: dimension animations can be handled by moving / passing / shuffling data
  //TODO: allow other forms of digging - flatten cells, wrap all rows in Cell, swap x/y...

  function mesh(data) {

    function dig(data, dims, nodes) {
      if (dims.length == 0) {
        return new Cell(nodes, data);
      } else {
        var nodes_ = dims[0](data.length);
        console.log(nodes_, data);
        return data.map(function(d, i) {
          return dig(
            d,
            dims.slice(1, dims.length),
            nodes.concat(nodes_[i])
          );
        })
      }
    }

    return dig(data, [x, y], []);
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
