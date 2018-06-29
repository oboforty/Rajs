
Math.rad2deg = 180/Math.PI;
Math.deg2rad = Math.PI/180;
Math.TAU = 2*Math.PI;

Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/(base ? log(base) : 1);
  };
})();
