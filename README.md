# d3-mesh

Create a mesh of SVG elements the d3 way

![alt tag](https://cloud.githubusercontent.com/assets/10756296/15933899/de013c76-2e61-11e6-88ad-3d0fef83af32.png)

## Installing

If you use NPM, `npm install d3-mesh`. Otherwise, download the [latest release](https://github.com/rwakulszowa/d3-mesh/releases/latest).
If you are super lazy, I also keep the non-minified source in
`https://raw.githubusercontent.com/rwakulszowa/d3-mesh/v0.0.1/examples/d3-mesh.js`
which you can probably copy-paste into your script.

## API Reference

<a href="#d3_mesh" name="d3_mesh">#</a> <i>d3</i>.<b>mesh</b>()

Constructs a new mesh with default values.

<a href="#mesh" name="mesh">#</a> <b>mesh</b>(data)

Converts a n-dimensional data array to an array of dimensions specified in *mesh*.**divs**, where each data point is converted to a cell object `{'data': d, 'd0': [start, end], 'd1': [start, end], 'dn'...}`
start and end values are calculated as specified in *mesh*.**cell**
```js
var mesh = d3_mesh.mesh()
    .divs([2, 2])
    .dims([
      function(x) { return 20 * x; },
      function(x) { return 16 * x; }
    ]);

var data = [
  [1, 2],
  [3, 4]
];

mesh(data);  /*
[
  [
    {'d0': [0, 10], 'd1': [0, 8], 'data': 1},
    {'d0': [0, 10], 'd1': [8, 16], 'data': 2},
  ],
  [
    {'d0': [10, 20], 'd1': [0, 8], 'data': 3},
    {'d0': [10, 20], 'd1': [8, 16], 'data': 4}
  ]
]
*/
```

<a href="#mesh_cell" name="mesh_cell">#</a> <i>mesh</i>.<b>cell</b>(indices)

Returns an object `{'d0': [start, end], 'd1': [start, end], 'dn'...}` occupying position indices[0], indices[1], indices[n]... on a mesh. Position in each dimension is calculated using formula
```js
[dims[n](indices[n]/divs[n]), dims[n](indices[n+1]/divs[n])
```

```js
var mesh = d3_mesh.mesh()
    .divs([2, 3])
    .dims([
      function(x) { return 20 * x; },
      function(x) { return 15 * x; }
    ]);

mesh.cell([0, 1]);  // {'d0': [0, 10], 'd1': [5, 10]}
mesh.cell([1, 1]);  // {'d0': [10, 20], 'd1': [5, 10]}
mesh.cell([3, 3]);  // {'d0': [30, 40], 'd1': [15, 20]}

```
It is assumed that `indices.length == dims.length`

<a href="#mesh_interpolate" name="mesh_interpolate">#</a> <i>mesh</i>.<b>interpolate</b>(args)

Calls dims[i] on args[i], returning an array of interpolated values.
If args[i] is an array, dims[i] is called on each element, resulting in a nested array being returned.
It is assumed that `args.length == dims.length`

```js
var mesh = d3_mesh.mesh()
    .divs([2, 3])
    .dims([
      function(x) { return 20 * x; },
      function(x) { return 15 * x; }
    ]);

mesh.interpolate([0.5, 0.4]);  // [10, 6]
mesh.interpolate([1.5, 2.0]);  // [30, 30]
```

<a href="#mesh_dims" name="mesh_dims" >#</a> <i>mesh</i>.<b>dims</b>([<i>dims</i>])

If *dims* is specified, sets the mesh’s dims to the specified array of values. The elements in the array may be any callables that accept numbers within range [0.0, 1.0] - d3.interpolate, d3.scale, or any other function. Note that depending on the way you use mesh, divs may be called with arguments outside the [0, 1] range, though if you are not planning to do any weird stuff with mesh, that won't happen.
If *dims* is not specified, returns the mesh’s current dims.
The default value is ``[function(x) { return x; }]``

<a href="#mesh_divs" name="mesh_divs" >#</a> <i>mesh</i>.<b>divs</b>([<i>divs</i>])

If *divs* is specified, sets the mesh’s divs to the specified array of values. The elements in the array must be positive integers.
If *divs* is not specified, returns the mesh’s current divs.
The default value is [1].
