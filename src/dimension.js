export default function dimension(nodes, divs) {
  return new Dimension(nodes, divs);
}

function Dimension(nodes, divs) {
  this.nodes = nodes;
  if (Array.isArray(nodes)) {
    this.divs = nodes.length - 1;
  } else if (typeof nodes == "function" && divs != undefined) {
    this.divs = divs;
    this.compute();
  } else {
    throw "Bad arguments";
  }
  this.normalize();
};

Dimension.prototype = {
  constructor: Dimension,

  compute: function() {
    var temp = new Array(this.divs + 1);
    for (var i=0; i < temp.length; ++i) { temp[i] = this.nodes(i / this.divs); };
    this.nodes = temp;
  },

  normalize: function() {
   var max = Math.max.apply(null, this.nodes);
   for (var i in this.nodes) { this.nodes[i] /= max; };
  }

};
