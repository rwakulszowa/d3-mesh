export default function Cell(nodes) {
  for (var i in nodes) {
    var n = nodes[i];
    if (n != undefined && n != null) {
      this['d' + i] = n;
    }
  }
}

Cell.prototype = {
  constructor: Cell
};
