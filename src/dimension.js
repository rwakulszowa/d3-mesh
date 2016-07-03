export default function(nodes, divs) {
  var dimension = {},
      domain = [0, 1];

  dimension.nodes = nodes;
  if (Array.isArray(nodes)) {
    dimension.divs = nodes.length - 1;
  } else if (typeof nodes == "function" && divs != undefined) {
    dimension.divs = divs;
    compute();
  } else {
    throw "Bad arguments";
  }
  normalize();

  function compute() {
     var temp = new Array(dimension.divs + 1);
     for (var i=0; i < temp.length; ++i) { temp[i] = dimension.nodes(i / dimension.divs); };
     dimension.nodes = temp;
  };

  function normalize() {
    var max = Math.max.apply(null, dimension.nodes);
    for (var i in dimension.nodes) { dimension.nodes[i] /= max; };
  };

  function expand() {
    var domainLength = domain[1] - domain[0];
    var expander = function(x) { return domain[0] + x * domainLength };
    for (var i in dimension.nodes) { dimension.nodes[i] = expander(dimension.nodes[i]); };
  }

  dimension.domain = function(_) {
    return arguments.length ? (
      domain = _,
      expand(),
      dimension
    ) : domain;
  };

  return dimension;
}
