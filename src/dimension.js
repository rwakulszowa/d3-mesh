function dim() {
  var domain = [0, 1],
      shape = [1];

  // Public - divide dimension into divs elements
  //
  // divs - dimension divisions
  //
  // Returns an array of boundary points
  function dimension(divs) {
    return coverDomain(
      sizesToNodes(
        expand(shape, divs)
      )
    );
  }

  // Private - expand the shape to divs length
  //
  // blueprint - an array to expand
  // len - desired length
  //
  // Returns a divs-element array of numbers
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

  // Private - convert sizes to nodes (compute prefix sum)
  //
  // sizes - an array of widths of each division
  //
  // Returns an array of sizes.length + 1 nodes
  function sizesToNodes(sizes) {

    function nextNode(nodes, sizes) {
      if (sizes.length == 0) {
        return nodes;
      } else {
        return nextNode(push(nodes, last(nodes) + sizes.shift()), sizes)
      }
    }

    function push(arr, el) {
      arr.push(el);
      return arr;
    }

    function last(arr) {
      return arr[arr.length - 1];
    }

    return nextNode([0], sizes);
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

  return dimension;
}

export default dim;
