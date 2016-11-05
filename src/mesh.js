import Cell from "./cell";
import dimension from "./dimension";

function mesh() {
  var mesh = {};

  var x = dimension().id("x"),
      y = dimension().id("y"),
      xs = [{ 'a': 0, 'b': 1 }],
      ys = [],
      data = [[]];

  //TODO: a fancy .get(indices) that appends when out of bounds
  //TODO: fix indentation (damn vim :/)

  // Public - map data to a 2D array of cells
  //
  // Returns a 2D array of Cells
  mesh.matrix = function() {

      function mapColumn(col, i) {
          return col.map(
              function(data, j) {
                  return new Cell(mesh, [i, j]);
              }
          );
      }

      return data.map(mapColumn);
  }

  // Public - insert a new column
  // 
  // colData - 1D array of length <= size.y
  // colIndex - where to put the array (default: append to the end)
  mesh.insertCol = function(colData, colIndex) {
     var size = mesh.size();
     colIndex = typeof colIndex == "undefined" ? size.x : colIndex;

     if (colIndex > size.x || colData.length > size.y) {
         throw "Weird insertion. Try mesh.data() instead"
     } else {
         xs = x(size.x + 1);
         colData = fillArray(colData, size.y);
         data.splice(colIndex, 0, colData);
     }
  }

  // Public - insert a new row
  // 
  // rowData - 1D array of length <= size.x
  // rowIndex - where to put the array (default: append to the end)
  mesh.insertRow = function(rowData, rowIndex) {
     var size = mesh.size();
     rowIndex = typeof rowIndex == "undefined" ? size.y : rowIndex;

     if (rowIndex > size.y || rowData.length > size.x) {
         throw "Weird insertion. Try mesh.data() instead"
     } else {
         ys = y(size.y + 1);
         rowData = fillArray(rowData, size.x);
         
         // Insert an element into each column
         for (var i in data) {
             var col = data[i];
             var rowEl = rowData[i];
             col.splice(rowIndex, 0, rowEl);
         }

     }
  }

  // Public - get current size of mesh
  //
  // Returns an object { x: int, y: int }
  mesh.size = function() {
    return { x: data.length, y: data[0].length };
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
  //
  // Note: designed to be used with a non-normalized 2D array,
  // where cols may differ in lengths
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
    return arr.map(
        function(col) { return fillArray(col, size.y); }
    ); 
  }

  // Private - fill an array with nulls
  function fillArray(arr, targetLen) {
      var fill = new Array(targetLen - arr.length).fill(null);
      return arr.concat(fill);
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
