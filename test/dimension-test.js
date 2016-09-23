var tape = require("tape"),
    mesh = require("../");

tape("Dimension with default settings works", function(test) {
  var dim = mesh.dimension();
  test.same(dim(2), [
    {'a': 0, 'b': 0.5},
    {'a': 0.5, 'b': 1}
  ]);
  test.end();
});

tape("Dimension with a fancy shape works", function(test) {
  var dim = mesh.dimension()
      .shape([1, 2]);
  test.same(dim(4), [
    {'a': 0, 'b': 1/6},
    {'a': 1/6, 'b': 1/2},
    {'a': 1/2, 'b': 4/6},
    {'a': 4/6, 'b': 1}
  ]);
  test.end();
});

tape("Dimension domain() sets and gets", function(test) {
  var dim = mesh.dimension()
      .domain([0, 100]);
  test.same(dim.domain(), [0, 100]);
  test.end();
});

tape("Dimension covers the domain", function(test) {
    var dim = mesh.dimension()
        .domain([0, 100])
        .shape([1, 2]);
    test.same(dim(3), [
      {'a': 0, 'b': 25},
      {'a': 25, 'b': 75},
      {'a': 75, 'b': 100}
    ]);
    test.end();
});
