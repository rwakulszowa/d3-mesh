var tape = require("tape"),
    grid = require("../");

tape("Grid binds data correctly", function(test) {
  var data = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f']
  ];
  var g = grid.grid()
      .dims([
        grid.dimension(function(x) { return x; }, 2),
        grid.dimension(function(x) { return x; }, 3)
      ]);
  test.same(g(data), [
    [
      {'d0': {'a': 0, 'b': 0.5}, 'd1': {'a': 0, 'b': 1/3}, 'data': 'a'},
      {'d0': {'a': 0, 'b': 0.5}, 'd1': {'a': 1/3, 'b': 2/3}, 'data': 'b'},
      {'d0': {'a': 0, 'b': 0.5}, 'd1': {'a': 2/3, 'b': 1}, 'data': 'c'},
    ],
    [
      {'d0': {'a': 0.5, 'b': 1}, 'd1': {'a': 0, 'b': 1/3}, 'data': 'd'},
      {'d0': {'a': 0.5, 'b': 1}, 'd1': {'a': 1/3, 'b': 2/3}, 'data': 'e'},
      {'d0': {'a': 0.5, 'b': 1}, 'd1': {'a': 2/3, 'b': 1}, 'data': 'f'},
    ]
  ]);
  test.end();
});
