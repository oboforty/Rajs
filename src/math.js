
Math.rad2deg = 180/Math.PI;
Math.deg2rad = Math.PI/180;
Math.TAU = 2*Math.PI;

Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();


function sum(...arr) {
  if (len(arr) == 0)
    return 0;

  if (len(arr) == 1 && Array.isArray(arr[0]))
    arr = arr[0];

  return arr.reduce(function (a, b) { return a + b; }, 0);
}

class Matrix {
  constructor(v) {
    this.m = v;
  }

  get ncols() {
    return len(this.m[0]);
  }

  get nrows() {
    return len(this.m);
  }

  clone() {
    return new Matrix(this.to_array());
  }

  to_array() {
    const m2 = [];

    for (let r of range(this.nrows)) {
      m2.push(this.m[r].slice());
    }

    return m2;
  }

  is(prop) {
    switch(prop) {
      case "square":
        return this.ncols == this.nrows; break;

      case "identity":
        // TODO:
        return false; break;

      case "inversable":
        // TODO:
        return this.determinant != 0; break;
    }

    throw Error("?");
  }

  map(fnc) {
    return this.m.map((col, i) => col.map((val, j) => fnc.bind(this)(val, i, j)));
  }

  iter(fnc) {
    return this.m.forEach((col,i) => col.map((val,j) => fnc.bind(this)(val, i,j)));
  }

  iter_with(that, fnc) {
    if (this.ncols != that.ncols || this.nrows != that.nrows)
      throw Error("grrrrrrrrrrrr");

    return this.iter((val,i,j)=>fnc.bind(this)(val, that.m[i][j], i, j));
  }

  transpose() {
    const tm = this.to_array();

    return new Matrix(tm[0].map((col, i) => tm.map(row => row[i])));
  }

  get determinant() {
    // todo: ...
  }

  inverse() {
    // todo: ...
  }

  get identity() {
    // todo: ...
  }

  equal(that) {
    if (!(that instanceof Matrix))
      throw new Error('param is not type of Matrix');

    if (this.ncols != that.ncols || this.nrows != that.nrows)
      return false;

    let eq = true;

    this.iter_with(that, (v1,v2, i,j)=>{
      if (v1!=v2)
        eq = false;
    });

    return eq;
  }

  mul(that) {
    if (!(that instanceof Matrix))
      throw new Error('param is not type of Matrix');

    if (this.ncols != that.nrows)
      throw new Error('matrix dimension mismatch');

    let result = new Array(this.m.length).fill(0).map(row => new Array(that.m[0].length).fill(0));

    return matrix(result.map((row, i) => {
      return row.map((val, j) => {
        return this.m[i].reduce((sum, elm, k) => sum + (elm*that.m[k][j]) ,0)
      })
    }));
  }

  div(that) {
    // todo: ...
  }

  add(that) {
    // todo: ...
  }

  sub(that) {
    // todo: ...
  }
}

function matrix(v) {return new Matrix(v)}
function vector(v) {return new Matrix([v])}
function cvector(v) {return new Matrix([v]).transpose()}
