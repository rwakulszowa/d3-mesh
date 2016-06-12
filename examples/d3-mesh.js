(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function mesh() {
    var dims,
        divs;

    //TODO: a fancy getter: no args -> whole mesh, some args -> filtered rows or sth
    
    function mesh(data) {
      return _dig(data, [], dims.length);
    }

    function _dig(data, indices, depth) {
        if (indices.length == depth) {
            return cell(indices, data);
        } else {
            return data.map(function(el, i) { return _dig(el, indices.concat(i), depth); });
        }
    }

    function cell(indices, data) {
      var ans = {};
      var starts = interpolate(indices.map(function(el, i) { return +el / divs[i]; }));
      var ends = interpolate(indices.map(function(el, i) { return (+el + 1) / divs[i]; }));
      for (var i in starts) {
        ans['d' + i] = [starts[i], ends[i]]
      }
      if (data) {
        ans['data'] = data;
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

    mesh.cell = cell;
    mesh.interpolate = interpolate;

    return mesh;
  };

  exports.mesh = mesh;

}));