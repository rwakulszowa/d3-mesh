var tape = require("tape"),
    mesh = require("../");

tape("Dimension fromFunction computes a function", function(test) {
  var dim = mesh.dimension.fromFunction(function(x) { return 10 * x; }, 2);
  test.same(dim.expand(), [0, 0.5, 1]);
  test.end();
});

tape("Dimension fromNodes sets nodes", function(test) {
  var dim = mesh.dimension.fromNodes([0, 1, 4]);
  test.same(dim.expand(), [0, 0.25, 1]);
  test.end();
});

tape("Dimension fromSizes computes nodes", function(test) {
  var dim = mesh.dimension.fromSizes([2, 1, 2]);
  test.same(dim.expand(), [0, 0.4, 0.6, 1]);
  test.end();
});

tape("Dimension domain() sets and gets", function(test) {
  var dim = mesh.dimension.fromNodes([0, 0.5, 1])
      .domain([0, 100]);
  test.same(dim.domain(), [0, 100]);
  test.end();
});
