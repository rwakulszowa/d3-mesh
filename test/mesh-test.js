var tape = require("tape"),
    mesh = require("../");

tape("mesh binds data correctly", function(test) {
  var data = [
    ['a', 'b'],  //TODO: use 2x2 instead
    ['c', 'd']
  ];
  var g = mesh.mesh();  //TODO

  test.same(g(data), [
    [
      {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0, 'b': 0.5}, 'data': 'a'},
      {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0.5, 'b': 1}, 'data': 'b'}
    ],
    [
      {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0, 'b': 0.5}, 'data': 'c'},
      {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0.5, 'b': 1}, 'data': 'd'}
    ]
  ]);
  test.end();
});
