var tape = require("tape"),
    grid = require("../");

tape("Cell constructor sets correct properties", function(test) {
  var c = new grid.Cell([
    {'a': 0, 'b': 1},
    null,
    {'a': 0.5, 'b': 1.5}
  ]);
  test.same(c, {'d0': {'a': 0, 'b': 1}, 'd2': {'a': 0.5, 'b':1.5}});
  test.end();
});
