# d3-mesh

Create a mesh of SVG elements the d3 way

## Installing

If you use NPM, `npm install d3-mesh`. Otherwise, download the [latest release](https://github.com/rwakulszowa/d3-mesh/releases/latest).
If you are super lazy, I also keep the non-minified source in
`https://raw.githubusercontent.com/rwakulszowa/d3-mesh/v0.1.0/examples/d3-mesh.js`
which you can probably copy-paste into your script.

## API Reference

<a href="#d3_mesh" name="d3_mesh">#</a> <i>d3</i>.<b>mesh</b>()

Constructs a new mesh with default values.

<a href="#mesh" name="mesh">#</a> <b>mesh</b>(data)

Converts a n-dimensional data array to an array of dimensions specified by *mesh*.**dims**, where each data point is converted to a cell object `{'data': data, 'd0': {'a': d0Start, 'b': d0End}, 'd1': {'a': d1Start, 'b': d1End}, 'dn'...}`
start and end values are calculated as specified in *d3_mesh*.**cell**
```js
var mesh = d3_mesh.mesh()
    .dims([
      d3_mesh.dimension([0, 0.5, 1]),
      d3_mesh.dimension([0, 0.5, 1])
    ]);

var data = [
  ['a', 'b'],
  ['c', 'd']
];

mesh(data);  /*
[
  [
    {'d0': {'a': 0, 'b': 0.5}, 'd1': {'a': 0, 'b': 0.5}, 'data': 'a'},
    {'d0': {'a': 0, 'b': 0.5}, 'd1': {'a': 0.5, 'b': 1}, 'data': 'b'},
  ],
  [
    {'d0': {'a': 0.5, 'b': 1}, 'd1': {'a': 0, 'b': 0.5}, 'data': 'c'},
    {'d0': {'a': 0.5, 'b': 1}, 'd1': {'a': 0.5, 'b': 1}, 'data': 'd'},
  ],
]
*/
```

<a href="#mesh_dims" name="mesh_dims" >#</a> <i>mesh</i>.<b>dims</b>([<i>dims</i>])

Dims stands for dimensions - a set of arrays defining nodes of each cell (i.e. start- and endpoints).

If *dims* is specified, sets the mesh’s dims to the specified array of values. The elements in the array must be objects of type *d3_mesh*.**Dimension**
If *dims* is not specified, returns the mesh’s current dims.
The default value is ``[]``

<a href="#mesh_dimension" name="mesh_dimension" >#</a> <i>d3_mesh</i>.<b>dimension</b>(<i>nodes</i>[<i>, divs</i>])

Constructs a new Dimension object with default *domain*.

<i>d3_mesh</i>.<b>dimension</b> must be called with an array of length >=1 or a function and an integer as arguments.
If *nodes* is an array, Dimension will divide its domain into a set of `nodes.length - 1` elements of start- and endpoints as defined by *nodes* argument.
If *nodes* is a callable, it must accept one argument - a number within range (0, 1). An array of length *divs* with start- and endpoints will be computed by passing *divs* equally divided numbers from range (0, 1) to *nodes*.
```js
//These are equal
var d1 = d3_mesh.dimension([0, 0.5, 1]),
    d2 = d3_mesh.dimension(function(x) { return x; }, 2);
```
NOTE: in most non-weird cases, you want to provide a function that is [monotonic](https://en.wikipedia.org/wiki/Monotonic_function) within range (0, 1).

Values provided / computed will be internally normalized, i.e. converted to fit within range (0, 1):
```js
//These are equal
var d1 = d3_mesh.dimension([0, 0.5, 1]),
    d2 = d3_mesh.dimension([0, 2, 4]);
```

<a href="#mesh_dimension_domain" name="mesh_dimension_domain" >#</a> <i>d3_mesh.dimension</i>.<b>domain</b>([<i>domain</i>])

Domain is the range of values the dimension will be expanded to from range (0, 1).
```js
var dim = mesh.dimension([0, 0.25, 0.5, 1])
    .domain([0, 100]);
dim.nodes;  // [0, 25, 50, 100]
```

If *domain* is specified, sets the mesh’s domain to *domain*. *domain* must be a 2-element array of numbers.
If *domain* is not specified, returns the dimension’s current domain.
The default value is ``[0, 1]``

## Examples

* [A fancy circle](https://cloud.githubusercontent.com/assets/10756296/15933899/de013c76-2e61-11e6-88ad-3d0fef83af32.png)
