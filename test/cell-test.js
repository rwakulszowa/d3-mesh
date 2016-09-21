var tape = require("tape"),
    mesh = require("../");

tape("Cell constructor sets correct properties", function(test) {
  var c = new mesh.Cell([
    {'a': 0, 'b': 1},
    {'a': 0.5, 'b': 1.5}
  ], 'abc');
  test.same(c, {'d0': {'a': 0, 'b': 1}, 'd1': {'a': 0.5, 'b':1.5}, 'data': 'abc'});
  test.end();
});
