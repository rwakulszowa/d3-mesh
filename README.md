# d3-mesh

Create a mesh of SVG elements the d3 way

## Description

The main goal of this module is to provide an easy way to split an area into regularly shaped pieces. You can divide an svg container into smaller ones, an svg circle into rings or a HTML div into a table-like structure (or an actual table, because why not).
d3-mesh only handles the computation of desired dimensions - it doesn't actually manipulate the DOM, but it provides lots of utilities to make it fancy, while d3 makes the actual creation easy.

But what's the point of using a library to convert an SVG element into some weird array? There's problably none. You should rethink your life. Or, if you actually know some useful application of it, please let me know and I'll rethink mine.

## Examples

* [A fancy circle](https://rawgit.com/rwakulszowa/d3-mesh/master/examples/circles.html)
* [Some cool shapes](https://rawgit.com/rwakulszowa/d3-mesh/master/examples/shapes.html)
* [Insertion sort visualization](https://rawgit.com/rwakulszowa/d3-mesh/master/examples/insertion.html)

## Installing

If you use NPM, `npm install d3-mesh`. Otherwise, download the [latest release](https://github.com/rwakulszowa/d3-mesh/releases/latest).
If you are super lazy, I also keep the non-minified source in
`https://raw.githubusercontent.com/rwakulszowa/d3-mesh/v0.3.1/examples/d3-mesh.js`
which you can probably include in your script.

## API Reference

<a href="#d3_mesh" name="d3_mesh">#</a> <i>d3</i>.<b>mesh</b>()

Constructs a new mesh with default values.

<a href="#mesh_data" name="mesh_data" >#</a> <i>mesh</i>.<b>data</b>([<i>data</i>])

If *data* is specified, sets the mesh’s data parameter to *data*. The stored value may be modified so that each column (internal array) has equal length.
If *data* is not specified, returns the mesh’s current data.
The default value is ``[[null]]`` - a 1x0 matrix

```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b'],
  ['c']
];

mesh.data(data);

mesh.data();  /*
[
    ['a', 'b'],
    ['c', null]  // gap filled with a null
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

<a href="#mesh_matrix" name="mesh_matrix">#</a> <b>matrix</b>()

Maps **data** to a 2D array of Cells
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b'],
  ['c', 'd']
];

mesh.data(data);
mesh.matrix();  /*
[
  [
    { i: 0, j: 0, parent: mesh },
    { i: 0, j: 1, parent: mesh },
  ],
  [
    { i: 1, j: 0, parent: mesh },
    { i: 1, j: 1, parent: mesh },
  ],
]
*/
```

<a href="#mesh_flat" name="mesh_flat">#</a> <b>flat</b>()

Maps **data** to a 1D array of Cells
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b'],
  ['c', 'd']
];

mesh.data(data);
mesh.flat();  /*
[
  { i: 0, j: 0, parent: mesh },
  { i: 0, j: 1, parent: mesh },
  { i: 1, j: 0, parent: mesh },
  { i: 1, j: 1, parent: mesh }
]
*/
```

<a href="#mesh_pick" name="mesh_pick">#</a> <b>pick</b>(<i>i</i>, <i>j</i>, [<i>d</i>])

Returns a Cell residing at indices *i*, *j*. If either *i* or *j* exceed current size, mesh is expanded to contain indices *i*, *j*.
If *d* is specified, data[*i*][*j*] will be set to *d*.
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a']
];

mesh.data(data);
mesh.pick(1, 1, 'd');
mesh.data();  /*
[
    ['a', null],
    [null, 'd']
]
*/
```

<a href="#mesh_insertRow" name="mesh_insertRow">#</a> <b>insertRow</b>(<i>rowData</i>, [<i>rowIndex</i>])

Inserts a new row filled with *rowData* into mesh.
If *rowIndex* is not specified, a new row will be appended at mesh.size().x
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a'],
  ['c']
];

mesh.data(data);
mesh.insertRow(['b', 'd']);
mesh.data();  /*
[
    ['a', 'b'],
    ['c', 'd']
]
*/
```

<a href="#mesh_insertCol" name="mesh_insertCol">#</a> <b>insertCol</b>(<i>colData</i>, [<i>colIndex</i>])

Inserts a new column filled with *colData* into mesh.
If *colIndex* is not specified, a new column will be appended at mesh.size().y
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b']
];

mesh.data(data);
mesh.insertCol(['c', 'd']);
mesh.data();  /*
[
    ['a', 'b'],
    ['c', 'd']
]
*/
```

<a href="#mesh_pickXs" name="mesh_pickXs">#</a> <b>pickXs</b>(<i>index</i>)

Pick *index*-th element of the x dimension

<a href="#mesh_pickYs" name="mesh_pickYs">#</a> <b>pickYs</b>(<i>index</i>)

Pick *index*-th element of the y dimension

<a href="#mesh_pickData" name="mesh_pickData">#</a> <b>pickData</b>(<i>i</i>, <i>j</i>)

Pick data[*i*][*j*]

<a href="#mesh_size" name="mesh_size">#</a> <b>size</b>()

Returns the current size of the mesh
```js
var mesh = d3_mesh.mesh()

var data = [
  ['a', 'b'],
  ['c', 'd']
];

mesh.data(data);
mesh.size();  // { x: 2, y: 2 }
```

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

<a href="#mesh_cell" name="mesh_cell" >#</a> <i>d3_mesh</i>.<b>cell</b>(<i>parent</i>, <i>indices</i>)  // TODO

Constructs a new Cell object. *parent* must be a *d3_mesh*.**mesh** *indices* must be a 2-element array of natural numbers.
NOTE: you dont need to build Cells by yourself, *d3_mesh*.**mesh** will handle it.

```js
var mesh = d3_mesh
    .mesh()
    .data([ [ 'a', 'b' ], [ 'c', 'd' ] ])
    .matrix();  // returns a 2D array of cells
mesh[0][0];  // { i: 0, j: 0, parent: mesh }  // a Cell object
```

<a href="#cell_x" name="cell_x" >#</a> <i>d3_mesh.cell</i>.<b>x</b>()

Returns this Cell's span over the x dimension.
```js
var m = d3_mesh
    .mesh()
    .data([ [ 'a', 'b' ], [ 'c', 'd' ] ])
    .matrix();
m[0][0].x();  // { a: 0, b: 0.5 }
```

<a href="#cell_y" name="cell_y" >#</a> <i>d3_mesh.cell</i>.<b>y</b>()

Returns this Cell's span over the y dimension.

<a href="#cell_y" name="cell_y" >#</a> <i>d3_mesh.cell</i>.<b>y</b>()

Returns data bound to this cell.

<a href="#cell_shape" name="cell_shape" >#</a> <i>d3_mesh.cell</i>.<b>shape</b>()

Returns an object of given cell's size in each dimension
```js
var m = d3_mesh
    .mesh()
    .data([ [ 'a', 'b' ], [ 'c', 'd' ] ])
    .matrix();
m[0][0].shape();  // { x: 0.5, y: 0.5 }
```
