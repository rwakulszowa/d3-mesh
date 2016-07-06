(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_mesh = global.d3_mesh || {})));
}(this, function (exports) { 'use strict';

  function Cell(nodes, data) {
    for (var i in nodes) {
      var n = nodes[i];
      if (n != undefined && n != null) {
        this['d' + i] = n;
      }
    }
    this['data'] = data;
  }

  Cell.prototype = {
    constructor: Cell
  };

  function dimension(nodes, divs) {
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

  function mesh() {
    var dims = [];

    //TODO: utils for irregular meshs (merged cells) - empty array cells? - map omits them

    //NOTE: dimension animations can be handled by moving passing / shuffling data
    //NOTE: data structure will always be the same / regular
    //TODO: multiple getters: flat, grouped by each dimension
    
    function mesh(data) {
      return _dig(data, [], dims.length);
    }

    function _dig(data, nodes, depth) {
      if (nodes.length == depth) {
        return new Cell(nodes, data);
      } else {
        var nextNodes = dims[nodes.length].nodes;
        return data.map(function(el, i) {
          return _dig(el, nodes.concat( {'a': nextNodes[i], 'b': nextNodes[i+1] } ), depth);
        });
      }
    }

    mesh.dims = function(_) {
      return arguments.length ? (
        dims = _,
        mesh
      ) : dims;
    };

    return mesh;
  };

  exports.mesh = mesh;
  exports.dimension = dimension;
  exports.Cell = Cell;

}));