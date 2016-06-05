var tape = require("tape"),
    mesh = require("../");

tape("mesh() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  test.equal(mesh.mesh(), 42);
  test.end();
});
