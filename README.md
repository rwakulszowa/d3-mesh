# d3-mesh

Create a mesh of SVG elements the d3 way

## Installing

If you use NPM, `npm install d3-mesh`. Otherwise, download the [latest release](https://github.com/rwakulszowa/d3-mesh/releases/latest).
If you are super lazy, I also keep the non-minified source in
`https://raw.githubusercontent.com/rwakulszowa/d3-mesh/v0.2.0/examples/d3-mesh.js`
which you can probably copy-paste into your script.

## API Reference

<a href="#d3_mesh" name="d3_mesh">#</a> <i>d3</i>.<b>mesh</b>()

Constructs a new mesh with default values.

<a href="#mesh" name="mesh">#</a> <b>mesh</b>(data)

Converts a 2-dimensional data array to an array of cell objects `{ 'data': data, 'x': { 'a': d0Start, 'b': d0End }, 'y': { 'a': d1Start, 'b': d1End } }`
start and end values are calculated as specified in *d3_mesh*.**dimension**
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b'],
  ['c', 'd']
];

mesh(data);  /*
[
  [
    {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0, 'b': 0.5}, 'data': 'a'},
    {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0, 'b': 0.5}, 'data': 'b'},
  ],
  [
    {'x': {'a': 0, 'b': 0.5}, 'y': {'a': 0.5, 'b': 1}, 'data': 'c'},
    {'x': {'a': 0.5, 'b': 1}, 'y': {'a': 0.5, 'b': 1}, 'data': 'd'},
  ],
]
*/
```

<a href="#mesh_x" name="mesh_x" >#</a> <i>mesh</i>.<b>x</b>([<i>x</i>])

If *x* is specified, sets the mesh’s x dimension to *x*
If *x* is not specified, returns the mesh’s current x.
The default value is ``d3_mesh.dimension()``

<a href="#mesh_y" name="mesh_y" >#</a> <i>mesh</i>.<b>y</b>([<i>y</i>])

If *y* is specified, sets the mesh’s y dimension to *y*
If *y* is not specified, returns the mesh’s current y.
The default value is ``d3_mesh.dimension()``

<a href="#mesh_dimension" name="mesh_dimension" >#</a> <i>d3_mesh</i>.<b>dimension</b>()

Constructs a new Dimension object with default values.
NOTE: you dont need to build Dimensions by yourself, *d3_mesh*.**mesh** will handle it.

<a href="#dimension_dimension" name="dimension_dimension" >#</a> <i>d3_mesh</i>.<b>dimension()</b>(<i>divs</i>)

Creates a *divs*-element array of objects {a: start, b: end}, where start and end are the nodes spanning over the entire *domain*. The objects' sizes are determined based on the value of <i>dimension</i>.<b>shape</b>.
The resulting array is sorted, where for each element other than the last one, result[i].b == result[i + 1].a

```js
d3_mesh.dimension()(4)
/*
[
    { a: 0,    b: 0.25 },
    { a: 0.25, b: 0.5  },
    { a: 0.5,  b: 0.75 },
    { a: 0.75, b: 1    }
]
*/
```

<a href="#dimension_shape" name="dimension_shape" >#</a> <i>d3_mesh.dimension</i>.<b>shape</b>([<i>shape</i>])

*shape* describes the sizes of each cell output by *dimension()*.
If *shape* is an array, the resulting array will be created by multiplicating *shape* to match the desired length.
If *shape* is a function, it must be a valid Array.map callback and it must return a number. NOTE: currently it is called on a *divs*-element array of nulls, it will be fixed soon. :)
```js
var dim1 = mesh.dimension()
    .shape([1, 3]);  // alternating cells of size 1 and 3
dim1(4);  // [ { a: 0, b: 1/8 }, { a: 1/8, b: 1/2 }, { a: 1/2, b: 5/8 }, { a: 5/8, b: 1 } ]

var dim2 = mesh.dimension()
    .shape(function(d, i) { return i == 0 ? 2 : 1 } );  // first cell spans two units, others span one
dim2(3);  // [ { a: 0, b: 1/2 }, { a: 1/2, b: 3/4 }, { a: 3/4, b: 1 } ]
```

If *shape* is specified, sets the dimension’s shape to *shape*.
If *shape* is not specified, returns the dimension’s current shape.
The default value is ``function(x) { return 1; }``

<a href="#dimension_domain" name="dimension_domain" >#</a> <i>d3_mesh.dimension</i>.<b>domain</b>([<i>domain</i>])

Domain is the range of values the dimension will be expanded to from range (0, 1).
```js
var dim = mesh.dimension()
    .domain([0, 100]);
dim(2);  // [ { a: 0, b: 50 }, { a: 50, b: 100 } ]
```

If *domain* is specified, sets the dimension’s domain to *domain*. *domain* must be a 2-element array of numbers.
If *domain* is not specified, returns the dimension’s current domain.
The default value is ``[0, 1]``

<a href="#mesh_cell" name="mesh_cell" >#</a> <i>d3_mesh</i>.<b>cell</b>(<i>nodes</i>, <i>data</i>)

Constructs a new Cell object. <i>nodes</i> must be a 2-element array, <i>data may be of any type</i>
NOTE: you dont need to build Cells by yourself, *d3_mesh*.**mesh** will handle it.

```js
var mesh = d3_mesh.mesh()([ [ 'a', 'b' ], [ 'c', 'd' ] ]);  // returns a 2D array of cells
mesh[0][0];  // { x: { a: 0, b: 0.5 }, y: { a: 0, b: 0.5 }, data: 'a' }  // a Cell object
```

<a href="#cell_shape" name="cell_shape" >#</a> <i>d3_mesh.cell</i>.<b>shape</b>()

Returns an object of given cell's size in each dimension
```js
var mesh = d3_mesh.mesh()([ [ 'a', 'b' ], [ 'c', 'd' ] ]);
mesh[0][0].shape();  // { x: 0.5, y: 0.5 }
```
## Examples
* [A fancy circle](https://rawgit.com/rwakulszowa/d3-mesh/master/examples/circles.html)
