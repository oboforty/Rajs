function time() {
    return Math.floor((new Date()).getTime()/1000);
}

function* range(min, max) {
    for(var i=min; i<max; i++) yield i;
}

function sumDict(dict) {
    var sum = 0;
    for (var key in dict) {
        sum += dict[key];
    }

    return sum;
}

function addDicts(obj1, obj2) {
    var obj ={}
    Object.keys(obj1).map(function(a){
      obj[a] = obj1[a]+obj2[a];
    });
    return obj;
}
