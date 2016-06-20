export default function Dimension(divs, nodes) {
  if (typeof nodes != "function" && nodes.length != divs + 1) {
    throw "Nodes must be a callable or an array of length divs + 1"
  }
  this.divs = divs;
  this.nodes = nodes;
}

Dimension.prototype = {
  constructor: Dimension,

  getNodes: function() {
    var nodes = typeof this.nodes == "function" ? (
      _computeNodes(this)
    ) : this.nodes;
    var max = Math.max.apply(null, nodes);
    for (var i in nodes) { nodes[i] /= max; };
    return nodes;
  }
};

function _computeNodes(d) {
  var temp = new Array(d.divs + 1);
  for (var i=0; i < temp.length; ++i) { temp[i] = d.nodes(i / d.divs); };
  return temp;
}
