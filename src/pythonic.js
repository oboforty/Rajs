
String.prototype.title = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.lower = function() {
  return this.toLowerCase(); 
};

String.prototype.upper = function() {
  return this.toUpperCase();
};

String.prototype.encode = function(encoding) {
  let textEncoder = new TextEncoder(encoding);

  return textEncoder.encode(this);
};

String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

Array.prototype.remove = function(element) {
  const index = this.indexOf(element);

  this.splice(index, 1);
};

ArrayBuffer.prototype.decode = function(encoding, opts) {
  let textDecoder = new TextDecoder(encoding);

  return textDecoder.decode(this, opts);
};

// Uint8Array.prototype.decode = ArrayBuffer.prototype.decode;
// Uint32Array.prototype.decode = ArrayBuffer.prototype.decode;

Set.prototype.update = function(arr) {
  for (var item of arr) {
    this.add(item);
  }
};

Object.items = function(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push([key, obj[key]]);
  }
  return arr;
};

function str(val) {
  if (typeof val === 'undefined')
    return '';
  if (typeof val === 'string')
    return val;
  return val.toString();
}

function float(val) {
  if (typeof val === 'undefined')
    return 0.0;
  if (typeof val === 'string')
    return parseFloat(val);
  if (typeof val === 'number')
    return val;
}

function int(val) {
  if (typeof val === 'undefined')
    return 0;
  if (typeof val === 'string')
    return parseInt(val);
  if (typeof val === 'number')
    return val;
}

function bool(val) {
  if (typeof val === 'undefined')
    return false;
  return Boolean(val);
}

function dict(val) {
  if (typeof val === 'undefined')
    return {};

  var v = {};
  for (var key in val) {
    var e = val[key];
    v[e[0]] = e[1];
  }
  return v;
}

function list(val) {
  if (typeof val === 'undefined')
    return [];
  var l = [];
  for (var elem of val) {
    l.push(elem);
  }
  return l;
}

function bytes(data, encoding) {
  if (Array.isArray(data))
    if (encoding == 'utf-8')
      return new Uint32Array(data);
    else if (encoding == 'ascii' || !encoding)
      return new Uint8Array(data);
  else if (typeof data === 'string')
    return data.encode(encoding);

  
};


function defaultdict(deftype, isFunc) {
  return new Proxy({}, {
    get: function(target, name) {
      if (typeof target[name] !== 'undefined')
        return target[name];
      else if (typeof deftype === 'function') {
        if (isFunc)
          var v = deftype();
        else
          var v = new deftype();

        target[name] = v;
        return v
      }
    }
  });
}

function print(str) {
  console.log(str);
}
function time() {
    return Math.floor((new Date()).getTime()/1000);
}

function*range(min,max,step){
  if (max==null) {var max = min; var min = 0;} 
  if (step==null) {var step = 1;} 
  if (step > 0)
    for(var i=min;i<max;i+=step) 
      yield i;
  else if (step < 0)
    for(var i=max;i<min;i+=step)
      yield i;
}

function*enumerate(arr){
  for (var i in arr)
    yield [i, arr[i]];
}

function len(obj) {
  if (obj.length)
    return obj.length;
  else if (obj.size)
    if (typeof obj.size === 'function')
      return obj.size();
    else
      return obj.size;
  else if (typeof obj === 'object')
    return Object.keys(obj).length;
  else
    throw "Type " + typeof(obj) + " has no 'len' property.";
}

function any(iterable) {
    for (var index = 0; index < iterable.length; ++index) {
        if (iterable[index]) return true;
    }
    return false;
}

function all(iterable) {
    for (var index = 0; index < iterable.length; ++index) {
        if (!iterable[index]) return false;
    }
    return true;
}

function round(n, digits) {
  if (!digits)
    return Math.round(n);
  else
    return parseFloat(n.toFixed(digits));
}