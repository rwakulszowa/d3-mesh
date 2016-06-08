(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function mesh() {
    var dims,
        divs;

    //TODO: cell.js
    //TODO: 3 results: interpolate(relX, relY, ...) -> array of interpolated dims, mesh(dims) -> N-D array of cells / callable?, cover(context, data) -> selection of {data, d1, d2, dx...}
    //TODO: provide some useful interpolators out of the box

    function mesh(indices) {
        var ans = [];
        for (var i in dims) {
          ans[i] = dims[i](indices[i] / divs[i]);
        }
        return ans;
    }

    function interpolate(args) {
        var ans = new Array(dims.length);
        for (var i in args) {
            ans[i] = dims[i](args[i]);
        }
        return ans;
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