function time() {
    return (new Date()).getTime()/1000;
}

function* range(min, max) {
    for(var i=min; i<max; i++) yield i;
}
