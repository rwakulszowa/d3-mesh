import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var x = dimension().id("x"),
      y = dimension().id("y"),
      xs = [{ 'a': 0, 'b': 1 }],
      ys = [],
      data = [[]];

  //TODO: appendRow/Col
  //TODO: a fancy .get(indices) that appends when out of bounds
  //TODO: fix indentation (damn vim :/)

  // Public - map data to a 2D array of cells
  //
  // Returns a 2D array of Cells
  var mesh = function() {

      function mapColumn(col, i) {
          return col.map(
              function(data, j) {
                  return new Cell([xs[i], ys[j]], data);
              }
          );
      }

      return data.map(mapColumn);
  }

  // Public - pick xs by index
  mesh.pickXs = function(index) {
      return xs[index];
  }

  // Public - pick ys by index
  mesh.pickYs = function(index) {
      return ys[index];
  }

  // Public - pick data by indices
  mesh.pickData = function(i, j) {
      return data[i][j];
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
      recompute(_),
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

  // Private - build an enclosing array from data
  //
  // arr - a 2D array (an array of columns)
  // size - an object { x: int, y: int }
  //
  // Returns a new 2d array
  function enclose(arr, size) {
    
    function fillColumn(col, targetLen) {
        var fill = new Array(targetLen - col.length).fill(null);
        return col.concat(fill);
    }

    return arr.map(
        function(col) { return fillColumn(col, size.y); }
    ); 
  }
  
  // Private - comopute all internal params to fit data
  //
  // arr - a 2D array
  function recompute(arr) {
     var size = enclosingSize(arr);

     data = enclose(arr, size);
     xs = x(size.x);
     ys = y(size.y);
  }

  return mesh;
};

export default mesh;
