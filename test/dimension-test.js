var tape = require("tape"),
    mesh = require("../");

tape("Dimension with default settings works", function(test) {
  var dim = mesh.dimension();
  test.same(dim(2), [0, 0.5, 1]);
  test.end();
});

tape("Dimension with a fancy shape works", function(test) {
  var dim = mesh.dimension()
      .shape([1, 2]);
  test.same(dim(4), [0, 1/6, 0.5, 4/6, 1]);
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
    test.same(dim(3), [0, 25, 75, 100]);
    test.end();
});
