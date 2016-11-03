import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var x = dimension().id("x"),
      y = dimension().id("y"),
      data = [[]];

  //TODO: appendRow/Col
  //TODO: a fancy .get(indices) that appends when out of bounds

  // Public - create a mesh bound with data
  //
  // data - 2D array of data to be bound
  //
  // Returns a 2D array of Cells
  // TODO: rewrite this to use .data
  function mesh(data, flatten) {
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

  // Public - set or get data
  // 
  // _ - new data (optional)
  //
  // Returns dimension or mesh
  //
  // Note: setter may store a modified value
  mesh.data = function(_) {
    return arguments.length ? (
      data = enclose(_),
      mesh
    ) : data;
  };

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

  // Private - get size of the enclosing array
  function enclosingSize(arr) {
    var x = arr.length;
    var y = Math.max.apply(
        0,
        arr.map(function(col) { return col.length; } )
    );
    return { x: x, y: y };
  }

  //Private - build an enclosing array from data
  //
  // arr - a 2D array (an array of columns)
  //
  // Returns a new 2d array
  function enclose(arr) {
    
    function fillColumn(col, targetLen) {
        var fill = new Array(targetLen - col.length).fill(null);
        return col.concat(fill);
    }

    var size = enclosingSize(arr);
    return arr.map(
        function(col) { return fillColumn(col, size.y); }
    ); 
  }

  return mesh;
};

export default mesh;
