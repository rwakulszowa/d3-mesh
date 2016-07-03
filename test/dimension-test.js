var tape = require("tape"),
    grid = require("../");

tape("Dimension constructor throws on bad args", function(test) {
  test.throws(function() { return grid.dimension(2, [0, 1]); });
  test.end();
});

tape("Dimension constructor normalizes an array", function(test) {
  var dim = grid.dimension([0, 1, 2]);
  test.same(dim.nodes, [0, 0.5, 1]);
  test.end();
});

tape("Dimension constructor calls and normalizes a function", function(test) {
  var dim = grid.dimension(function(x) { return 10 * x; }, 2);
  test.same(dim.nodes, [0, 0.5, 1]);
  test.end();
});
