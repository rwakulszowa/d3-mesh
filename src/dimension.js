function dim() {
  var domain = [0, 1],
      shape = function(x) { return 1; },
      id = null;

  // Public - divide dimension into divs elements
  //
  // divs - dimension divisions
  //
  // Returns an array of boundary points
  function dimension(divs) {
    return nodesToRanges(
      coverDomain(
        shapeToNodes(
          makeNodes(divs)
        )
      )
    )
  }

  // Private - convert shape variable to an array
  //
  // len - desired length
  //
  // Returns an array of len numbers
  function makeNodes(len) {
    if (Array.isArray(shape)) {
      return expand(shape, len);
    } else if (typeof shape == "function") {
      return Array.apply(null, Array(len)).map(shape);
    } else {
      throw("shape must be an Array or a function")
    }
  }

  // Private - expand the shape to len length
  //
  // blueprint - an array to expand
  // len - desired length
  //
  // Returns a len-element array of numbers
  function expand(blueprint, len) {
    if (blueprint.length == 0) {
      throw("empty blueprint");
    }

    function repeat(res) {
      if (res.length == len) {
        return res
      } else {
        return repeat(res.concat(blueprint.slice(0, len - res.length)));
      }
    }

    return repeat([]);
  }

  // Private - convert shape to nodes (compute prefix sum)
  //
  // shape - an array of widths of each division
  //
  // Returns an array of shape.length + 1 nodes
  function shapeToNodes(shape) {

    function nextNode(nodes, shape) {
      if (shape.length == 0) {
        return nodes;
      } else {
        return nextNode(push(nodes, last(nodes) + shape.shift()), shape)
      }
    }

    function push(arr, el) {  //TODO: use concat instead
      arr.push(el);
      return arr;
    }

    function last(arr) {
      return arr[arr.length - 1];
    }

    return nextNode([0], shape);
  }

  // Private - transform nodes to cover domain
  //
  // nodes - an array of nodes
  //
  // Returns an array of nodes.length nodes spanning over domain
  function coverDomain(nodes) {
    var domainLength = domain[1] - domain[0],
        min = Math.min.apply(Number.MAX_VALUE, nodes),
        max = Math.max.apply(null, nodes),
        diff = max - min;

    return nodes.map(function(n) {
      return domain[0] + domainLength * (n - min) / diff;
    })
  }

  // Private - convert nodes to ranges
  //
  // nodes - an array of nodes
  //
  // Returns an array of nodes.length +1 objects {'a':..., 'b': ...}
  function nodesToRanges(nodes) {

    function build(nodes, ranges) {
      if (nodes.length <= 1) {
        return ranges;
      } else {
        return build(
          nodes.slice(1, nodes.length),
          ranges.concat({ 'a': nodes[0], 'b': nodes[1] })
        )
      }
    }

    return build(nodes, []);
  }

  // Public - set or get domain attribute
  //
  // _ - new domain value (optional)
  //
  // Returns domain or dimension
  dimension.domain = function(_) {
    return arguments.length ? (
      domain = _,
      dimension
    ) : domain;
  };

  // Public - set or get shape attribute
  //
  // _ - new shape value (optional)
  //
  // Returns shape or dimension
  dimension.shape = function(_) {
    return arguments.length ? (
      shape = _,
      dimension
    ) : shape;
  };

  // Public - set or get id attribute
  //
  // _ - new id value (optional)
  //
  // Returns id or dimension
  dimension.id = function(_) {
    return arguments.length ? (
      id = _,
      dimension
    ) : id;
  };

  return dimension;
}

export default dim;
