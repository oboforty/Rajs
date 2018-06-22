function time() {
    return Math.floor((new Date()).getTime()/1000);
}

function*range(min,max,step){
  if (!max) {var max = min; var min = 0;} 
  if (!step) {var step = 1;} 
  if (step > 0)
    for(var i=min;i<max;i+=step) 
      yield i;
  else if (step < 0)
    for(var i=max;i<min;i+=step)
      yield i;
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