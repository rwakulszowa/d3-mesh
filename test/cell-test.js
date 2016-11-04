var tape = require("tape"),
    mesh = require("../");

tape("Cell constructor sets correct properties", function(test) {
  var m = mesh.mesh();
  var indices = [1, 0];
  var c = new mesh.Cell(m, indices);

  test.same(
      c,
      {
          parent: m,
          i: 1,
          j: 0
      }
  );
  test.end();
});

tape("Cell accesses x", function(test) {
  var data = [['a', 'b'], ['c', 'd']];
  var m = mesh.mesh().data(data);
  var indices = [1, 0];
  var c = new mesh.Cell(m, indices);

  test.same(
      c.x(),
      { a: 0.5, b: 1}
  );
  test.end();
});

tape("Cell accesses y", function(test) {
  var data = [['a', 'b'], ['c', 'd']];
  var m = mesh.mesh().data(data);
  var indices = [1, 0];
  var c = new mesh.Cell(m, indices);

  test.same(
      c.y(),
      { a: 0, b: 0.5 }
  );
  test.end();
});

tape("Cell accesses data", function(test) {
  var data = [['a', 'b'], ['c', 'd']];
  var m = mesh.mesh().data(data);
  var indices = [1, 0];
  var c = new mesh.Cell(m, indices);

  test.same(
      c.d(),
      'c'
  );
  test.end();
});

tape("Cell computes shape", function(test) {
  var data = [['a', 'b']];
  var m = mesh.mesh().data(data);
  var indices = [0, 1];
  var c = new mesh.Cell(m, indices);

  test.same(
      c.shape(),
      { x: 1, y: 0.5 }
  );
  test.end();
});
