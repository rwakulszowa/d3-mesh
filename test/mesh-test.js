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

tape("mesh.matrix... well, works (with default dims)" , function(test) {
  var data = [
    ['a', 'b'],
    ['c', null]
  ];
  var m = mesh.mesh().data(data);

  test.same(m.matrix(), [
    [
        { i: 0, j: 0, parent: m },
        { i: 0, j: 1, parent: m }
    ],
    [
        { i: 1, j: 0, parent: m },
        { i: 1, j: 1, parent: m }
    ]
  ]);
  test.end();
});

tape("mesh pickXs picks the right element" , function(test) {
  var data = [
    ['a', 'b'],
    ['c', null]
  ];
  var m = mesh.mesh().data(data);

  test.same(m.pickXs(1), { a: 0.5, b: 1 } );
  test.end();
});

tape("mesh pickYs picks the right element" , function(test) {
  var data = [
    ['a', 'b'],
    ['c', null]
  ];
  var m = mesh.mesh().data(data);

  test.same(m.pickYs(1), { a: 0.5, b: 1 } );
  test.end();
});

tape("mesh pickData picks the right element" , function(test) {
  var data = [
    ['a', 'b'],
    ['c', null]
  ];
  var m = mesh.mesh().data(data);

  test.same(m.pickData(1, 0), 'c' );
  test.end();
});

