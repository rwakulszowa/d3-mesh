// Public - set create a new Cell
//
// nodes - array of start- and endpoints for each dimension
// data - value to be bound to a cell
// dims - list of dimension names (default: "xyz")
//
// Returns dimension or mesh
export default function Cell(nodes, data, dims) {
  dims = dims || "xyz";

  for (var i in nodes) {
    this[dims[i]] = nodes[i];
  }

  this['data'] = data;
}

Cell.prototype = {
  constructor: Cell
};
