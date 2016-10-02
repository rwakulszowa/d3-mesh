// Public - set create a new Cell
//
// nodes - array of start- and endpoints for each dimension
// data - value to be bound to a cell
//
// Returns dimension or mesh
export default function Cell(nodes, data) {
  var dims = "xy";

  for (var i in nodes) {
    this[dims[i]] = nodes[i];
  }

  this['data'] = data;
}

Cell.prototype = {
  constructor: Cell,
  shape: function() {
    return {
      "x": this.x.b - this.x.a,
      "y": this.y.b - this.y.a
    }
  }
};
