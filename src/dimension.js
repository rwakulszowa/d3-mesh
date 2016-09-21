function dim(nodes) {
  var dimension = {},
      domain = [0, 1];

  dimension.domain = function(_) {
    return arguments.length ? (
      domain = _,
      dimension
    ) : domain;
  };

  dimension.nodes = function(_) {
    return arguments.length ? (
      dimension
    ) : nodes;
  }

  dimension.expand = function() {
    var domainLength = domain[1] - domain[0],
        min = Math.min.apply(Number.MAX_VALUE, nodes),
        max = Math.max.apply(null, nodes),
        diff = max - min;

    return nodes.map(function(n) {
      return domain[0] + (n - min) / diff * domainLength;
    })
  };

  return dimension;
}

dim.fromFunction = function(fun, divs) {
  var nodes = new Array(divs + 1);
  for (var i = 0; i < nodes.length; ++i) { nodes[i] = fun(i); };
  return dim(nodes);
}

dim.fromSizes = function(sizes) {
  var nodes = new Array(sizes.length + 1);
  nodes[0] = 0;
  for (var i = 0; i < sizes.length; ++i) { nodes[i + 1] = nodes[i] + sizes[i]; };
  return dim(nodes);
}

dim.fromNodes = dim;

export default dim;
