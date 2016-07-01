export default function Cell(nodes, data) {
  for (var i in nodes) {
    var n = nodes[i];
    if (n != undefined && n != null) {
      this['d' + i] = n;
    }
  }
  this['data'] = data;
}

Cell.prototype = {
  constructor: Cell
};
