var tape = require("tape"),
    mesh = require("../");

tape("Cell constructor sets correct properties", function(test) {
  var c = new mesh.Cell([
    { id: "x", val: {'a': 0, 'b': 1} },
    { id: "y", val: {'a': 0.5, 'b': 1.5} }
  ], 'abc');
  test.same(c, {'x': {'a': 0, 'b': 1}, 'y': {'a': 0.5, 'b':1.5}, 'data': 'abc'});
  test.end();
});
