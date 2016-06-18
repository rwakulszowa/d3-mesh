export default function() {
      dims = [1],
      nodes = [function(x) { return x; }];

  //TODO: a fancy getter: no args -> whole mesh, some args -> filtered rows or sth
  //TODO: utils for irregular grids (merged cells)
  //TODO: utils for easy resizing - array of keypoints? (regular divisions by default, allow resizing)
  //TODO: keep a full grid internally, return a flat selection (easy management of merged cells)

  function grid(data) {

  }

  function cell(indices, data) {
    var ans = {};
    return ans;
  }

  grid.dims = function(_) {
    return arguments.length ? (
      dims = _,
      mesh
    ) : dims;
  };

  grid.cell = cell;

  return grid;
};
