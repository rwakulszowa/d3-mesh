// Public - set create a new Cell
//
// nodes - array of start- and endpoints for each dimension
// data - value to be bound to a cell
//
// Returns dimension or mesh
export default function Cell(nodes, data) {

  for (var i in nodes) {
    var n = nodes[i];  // old node doesnt support for .. of .. :/
    this[n.id] = n.val;
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
