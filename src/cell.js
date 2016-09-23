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
