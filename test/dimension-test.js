var tape = require("tape"),
    grid = require("../");

tape("Dimension constructor throws on bad args", function(test) {
  test.throws(function() { return new grid.dimension(2, [0, 1]); });
  test.end();
});

tape("Dimension.getNodes normalizes an array", function(test) {
  var dim = new grid.dimension(2, [0, 1, 2]);
  test.same(dim.getNodes(), [0, 0.5, 1]);
  test.end();
});

tape("Dimension.getNodes calls and normalizes a function", function(test) {
  var dim = new grid.dimension(2, function(x) { return 10 * x; } );
  test.same(dim.getNodes(), [0, 0.5, 1]);
  test.end();
});
