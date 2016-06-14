var tape = require("tape"),
    d3_mesh = require("../");

tape("cell test", function(test) {
  var mesh = d3_mesh.mesh()
      .divs([2, 3])
      .dims([
        function(x) { return 20 * x; },
        function(x) { return 15 * x; }
      ]);

  test.same(
    mesh.cell([1, 1]),
    {'d0': [10, 20], 'd1': [5, 10]}
  );

  test.end();
});

tape("interpolate test", function(test) {
  var mesh = d3_mesh.mesh()
      .divs([2, 3])
      .dims([
        function(x) { return 20 * x; },
        function(x) { return 15 * x; }
      ]);

  test.same(
    mesh.interpolate([0.5, 0.4]),
    [10, 6]
  );

  test.end();
});

tape("mesh test", function(test) {
  var mesh = d3_mesh.mesh()
      .divs([2, 4])
      .dims([
        function(x) { return 20 * x; },
        function(x) { return 16 * x; }
      ]);
  var data = [
    [1, 2, 3, 4],
    [5, 6, 7, 8]
  ];

  test.same(
    mesh(data),
    [
      [
        {'d0': [0, 10], 'd1': [0, 4], 'data': 1},
        {'d0': [0, 10], 'd1': [4, 8], 'data': 2},
        {'d0': [0, 10], 'd1': [8, 12], 'data': 3},
        {'d0': [0, 10], 'd1': [12, 16], 'data': 4}
      ],
      [
        {'d0': [10, 20], 'd1': [0, 4], 'data': 5},
        {'d0': [10, 20], 'd1': [4, 8], 'data': 6},
        {'d0': [10, 20], 'd1': [8, 12], 'data': 7},
        {'d0': [10, 20], 'd1': [12, 16], 'data': 8}
      ]
    ]
  );

  test.end();
});
