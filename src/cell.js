export default function Cell(nodes, data) {
  for (var i in nodes) {
    this['d' + i] = nodes[i];
  }
  this['data'] = data;
}

Cell.prototype = {
  constructor: Cell
};
