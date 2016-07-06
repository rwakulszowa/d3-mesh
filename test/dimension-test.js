var tape = require("tape"),
    mesh = require("../");

tape("Dimension constructor throws on bad args", function(test) {
  test.throws(function() { return mesh.dimension(2, [0, 1]); });
  test.end();
});

tape("Dimension constructor normalizes an array", function(test) {
  var dim = mesh.dimension([0, 1, 2]);
  test.same(dim.nodes, [0, 0.5, 1]);
  test.end();
});

tape("Dimension constructor calls and normalizes a function", function(test) {
  var dim = mesh.dimension(function(x) { return 10 * x; }, 2);
  test.same(dim.nodes, [0, 0.5, 1]);
  test.end();
});

tape("Dimension domain() sets and gets", function(test) {
  var dim = mesh.dimension([0, 0.5, 1])
      .domain([0, 100]);
  test.same(dim.domain(), [0, 100]);
  test.end();
});

tape("Dimension domain() expands nodes", function(test) {
  var dim = mesh.dimension([0, 0.25, 0.5, 1])
      .domain([0, 100]);
  test.same(dim.nodes, [0, 25, 50, 100]);
  test.end();
});
