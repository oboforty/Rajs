import { RandomHandler } from "./random.js";

/**
 * 
 * @param  {string[]} args 
 * @returns {{[name: string]: number}}
 */
export function Enum(...args) {
  let obj = {};
  let i = 0;

  for(let e of args) {
    obj[e] = i++;
  }

  const en = Object.freeze(obj);
  return en;
}

export function dict(val) {
  const dc = {};
  if (typeof val === 'undefined') return dc;
  else if (typeof val === 'object') {
    val = val.entries ? val.entries() : Object.entries(val);
    for (const [k,v] of val) dc[k] = v;
  }
  else for (const k in val) { const e = val[k]; dc[e[0]] = e[1];}
  return dc;
};

export function defaultdict(deftype, isFunc) {
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

export function*enumerate(arr){
  for (var i in arr)
    yield [i, arr[i]];
}

export function list(val) {
  if (typeof val === 'undefined')
    return [];
  var l = [];
  for (var elem of val) {
    l.push(elem);
  }
  return l;
}

export function round(n, digits) {
  if (!digits)
    return window.Math.round(n);
  else
    return parseFloat(n.toFixed(digits));
}

export function type(obj) {
  if (obj === undefined) return undefined;
  else if (obj === null) return null;

  return Object.getPrototypeOf(obj).constructor;
}

export function time() {
  return window.Math.floor((new Date()).getTime()/1000);
}

export function*range(min,max,step){
  if (max==null) {var max = min; var min = 0;} 
  if (step==null) {var step = 1;} 
  if (step > 0)
    for(var i=min;i<max;i+=step) 
      yield i;
  else if (step < 0)
    for(var i=max;i<min;i+=step)
      yield i;
}

export function len(obj) {
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

export function sum(arr) {
  let s = 0;
  for (const item of arr)
    s += item;
  return s;
  // if (len(arr) == 0)
  //   return 0;

  // if (len(arr) == 1 && Array.isArray(arr[0]))
  //   arr = arr[0];

  // return arr.reduce(function (a, b) { return a + b; }, 0);
}

export function any(iterable) {
  for (const element of iterable)
    if (element)
      return true;
  return false;
}

export function initPythonic(ra, cls) {
  String.prototype.format = String.prototype.format || function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
  };

  String.prototype.title = String.prototype.title || function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  String.prototype.lower = String.prototype.lower || function() {
    return this.toLowerCase(); 
  };

  String.prototype.upper = String.prototype.upper || function() {
    return this.toUpperCase();
  };

  String.prototype.encode = String.prototype.encode || function(encoding) {
    let textEncoder = new TextEncoder(encoding);

    return textEncoder.encode(this);
  };

  ArrayBuffer.prototype.decode = ArrayBuffer.prototype.decode || function(encoding, opts) {
    let textDecoder = new TextDecoder(encoding);

    return textDecoder.decode(this, opts);
  };

  Set.prototype.update = Set.prototype.update || function(arr) {
    for (var item of arr) {
      this.add(item);
    }
  };

  Object.items = Object.items || Object.entries || function(obj) {
    let arr = [];
    for (let key in obj) {
      arr.push([key, obj[key]]);
    }
    return arr;
  };


  cls.str = function(val) {
    if (typeof val === 'undefined')
      return '';
    if (typeof val === 'string')
      return val;
    return val.toString();
  }
  
  cls.float = function(val) {
    if (typeof val === 'undefined')
      return 0.0;
    if (typeof val === 'string')
      return parseFloat(val);
    if (typeof val === 'number')
      return val;
  }
  
  cls.int = function(val) {
    if (typeof val === 'undefined')
      return 0;
    if (typeof val === 'string')
      return parseInt(val);
    if (typeof val === 'number')
      return val;
  }
  
  cls.bool = function(val) {
    if (typeof val === 'undefined')
      return false;
    return Boolean(val);
  }
  
  cls.dict = dict;
  
  cls.list = list;
  
  cls.bytes = function(data, encoding) {
    if (Array.isArray(data))
      if (encoding == 'utf-8')
        return new Uint32Array(data);
      else if (encoding == 'ascii' || !encoding)
        return new Uint8Array(data);
    else if (typeof data === 'string')
      return data.encode(encoding);
  };

  cls.defaultdict = defaultdict;

  cls.time = time;
  cls.enumerate = enumerate;
    
  cls.len = len;
  
  cls.any = any;
  
  cls.all = function(iterable) {
      for (var index = 0; index < iterable.length; ++index) {
          if (!iterable[index]) return false;
      }
      return true;
  }
  
  cls.round = round;
  
  cls.Enum = Enum;
  
  window.Math.log = (function() {
    var log = window.Math.log;
    return function(n, base) {
      return log(n)/(base ? log(base) : 1);
    };
  })();

  cls.random = new RandomHandler();

  cls.sum = sum;
}