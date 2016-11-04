// Public - create a new Cell
//
// parent TODO
// indices 
//
// Returns a new Cell
var Cell = function(parent, indices) {
    this.parent = parent;
    this.i = indices[0];
    this.j = indices[1];
};

Cell.prototype.x = function() {
    return this.parent.pickXs(this.i);
};

Cell.prototype.y = function() {
    return this.parent.pickYs(this.j);
};

Cell.prototype.d = function() {
    return this.parent.pickData(this.i, this.j);
};

Cell.prototype.shape = function() {
    var x = this.x();
    var y = this.y();
    return {
        x: x.b - x.a,
        y: y.b - y.a
    }
};

export default Cell;
