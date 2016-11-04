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

tape("mesh... well, works (with default dims)" , function(test) {
  var data = [
    ['a', 'b'],
    ['c', null]
  ];
  var m = mesh.mesh().data(data);

  test.same(m(), [
    [
        { data: 'a', x: { a: 0, b: 0.5 }, y: { a: 0, b: 0.5 } },
        { data: 'b', x: { a: 0, b: 0.5 }, y: { a: 0.5, b: 1 } },
    ],
    [
        { data: 'c', x: { a: 0.5, b: 1 }, y: { a: 0, b: 0.5 } },
        { data: null, x: { a: 0.5, b: 1 }, y: { a: 0.5, b: 1 } },
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

