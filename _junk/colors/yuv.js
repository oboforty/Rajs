
function clamp(n){
  if(n<0){return(0);}
  if(n>255){return(255);}
  return n;
}
function yuv2rgb(y,u,v){
    y=parseInt(y);
    u=parseInt(u);
    v=parseInt(v);
    r=clamp(Math.floor(y+1.4075*v));
    g=clamp(Math.floor(y-0.3455*u-(0.7169*v)));
    b=clamp(Math.floor(y+1.7790*u));
    return({r:r,g:g,b:b});
}

var shades = {
red:    {centre: [-0.55,0.65],  radius: 0.26},
green:  {centre: [-0.65,-0.6],  radius: 0.34},
blue:   {centre: [0.6,-0.6],    radius: 0.28},
purple: {centre: [0.6,0.6],     radius: 0.26},
grey:   {centre: [0,0.1],       radius: 0.1}
};

function randomShade(shade) {
    if (typeof shade == "string")
        var shade = shades[shade];
    var y = Math.random() * 255;
    var u = shade.centre[0] ;// + Math.cos(ang)*shade.radius;
    var v = shade.centre[1] ;// + Math.sin(ang)*shade.radius;
    return yuv2rgb(y,128*u,128*v);
}