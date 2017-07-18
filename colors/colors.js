
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

function toColor(hashable, transparent) {
    if (typeof hashable == "string")
        console.error("BEEP")

    if (hashable === 0) hashable = -2513;
    var num = hashable*2654435761 % Math.pow(2, 32);

    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
    if (transparent)
        return "rgba(" + [r, g, b, a].join(",") + ")";
    else
        return "rgb(" + [r, g, b].join(",") + ")";        
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
