(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function mesh() {
    var dims,
        divs;

    //TODO: cell.js, node.js?
    //TODO: 3 results: interpolate(relX, relY, ...) -> array of interpolated dims, mesh(dims) -> N-D array of cells / callable?, cover(context, data) -> selection of {data, d1, d2, dx...}
    //TODO: provide some useful interpolators out of the box

    function mesh(indices) {
      var ans = {};
      var starts = interpolate(indices.map(function(el, i) { return +el / divs[i]; }));
      var ends = interpolate(indices.map(function(el, i) { return (+el + 1) / divs[i]; }));
      for (var i in starts) {
        ans['d' + i] = [starts[i], ends[i]]
      }
      return ans;
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

  exports.mesh = mesh;

}));