(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function mesh() {
    var dims,
        divs;

    function mesh(whatever) {
      //TODO: n-D array of cells, somehow bind data / subcells with data
      //TODO: submesh / keep parent cell in a variable / keep child cells in a variable
      //TODO: keep the data structure
    }

    function get(indices) {
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

    mesh.get = get;
    mesh.interpolate = interpolate;

    return mesh;
  };

  exports.mesh = mesh;

}));