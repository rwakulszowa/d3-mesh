var tape = require("tape"),
    mesh = require("../");

tape("mesh sets and fills data correctly", function(test) {
  var data = [
    ['a', 'b'],
    ['c']
  ];
  var m = mesh.mesh().data(data);

  test.same(m.data(), [
    ['a', 'b'],
    ['c', null]
  ]);
  test.end();
});

tape("mesh flattens result", function(test) {
  var data = [
    ['a', 'b'],
    ['c', 'd']
  ];
  var m = mesh.mesh();

  test.same(m(data, true), [
    {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0, 'b': 0.5}, 'data': 'a'},
    {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0, 'b': 0.5}, 'data': 'b'},
    {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0.5, 'b': 1}, 'data': 'c'},
    {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0.5, 'b': 1}, 'data': 'd'}
  ]);
  test.end();
});
