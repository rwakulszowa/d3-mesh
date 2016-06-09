export default function() {
  var dims,
      divs;

  //TODO: cell.js, node.js?
  //TODO: 3 results: interpolate(relX, relY, ...) -> array of interpolated dims, mesh(dims) -> N-D array of cells / callable?, cover(context, data) -> selection of {data, d1, d2, dx...}
  //TODO: provide some useful interpolators out of the box

  function mesh(indices) {
    return indices.map(
      function(el, i) {
        // map each index to a pair (index, index+1) scaled to range [0, 1]
        return [ +el / divs[i], ( +el + 1) / divs[i] ];
      }
    ).reduce(
      function(obj, val, i) {
        // convert to an object {d0: [start, end], d1:[start, end], dn...}
        obj["d" + i] = val.map(function(el) { return dims[i](el); });
        return obj;
      }, {}
    );
  }

  function interpolate(args) {
    return args.map(function(el, i) {
      return Array.isArray(el) ? (
        el.map(function(e) { return dims[i](e); })
      ) : dims[i](el);
    });
  }

  mesh.dims = function(_) {
    return arguments.length ? (
      dims = _,
      mesh
    ) : dims;
  };

  mesh.divs = function(_) {
    return arguments.length ? (
      divs = _,
      mesh
    ) : divs;
  };

  mesh.interpolate = interpolate;

  return mesh;
};
