import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var x = dimension().id("x"),
      y = dimension().id("y"),
      size = { x: 1, y: 1 },
      matrix = [[null]];

  //TODO: appendRow/Col
  //TODO: a fancy .get(indices) that appends when out of bounds

  // Public - create a mesh bound with data
  //
  // data - 2D array of data to be bound
  //
  // Returns a 2D array of Cells
  function mesh(data, flatten) {  //rename this to data, call some private method internally
    flatten = flatten || false;

    function dig(data, dims, nodes) {
      if (dims.length == 0) {
        return new Cell(nodes, data);
      } else {
        var nodes_ = dims[0](data.length).map(function(n) { return { id: dims[0].id(), val: n }; } );
        return data.map(function(d, i) {
          return dig(
            d,
            dims.slice(1, dims.length),
            nodes.concat(nodes_[i])
          );
        })
      }
    }

    var ans = dig(data, [y, x], []);
    return flatten ? ans.reduce(function(p, c) { return p.concat(c); }, []) : ans;
  }

  // Public - set or get x attribute
  //
  // _ - new x value (optional)
  //
  // Returns dimension or mesh
  mesh.x = function(_) {
    return arguments.length ? (
      x = _,
      mesh
    ) : x;
  };

  // Public - set or get y attribute
  //
  // _ - new y value (optional)
  //
  // Returns dimension or mesh
  mesh.y = function(_) {
    return arguments.length ? (
      y = _,
      mesh
    ) : y;
  };

  // Private - get size of the bounding array
  function size(arr) {
    var x = arr.length;
    var y = Math.max.apply(
        0,
        arr.map(function(col) { return col.length; } )
    );
    return { x: x, y: y };
  }

  return mesh;
};

export default mesh;
