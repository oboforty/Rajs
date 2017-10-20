
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

function getContrast(hex) {
    //hex = hex.substr(1);
    var r = parseInt(hex.substr(1, 2), 16),
        g = parseInt(hex.substr(3, 2), 16),
        b = parseInt(hex.substr(5, 2), 16),
        yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function shadeColor(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
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

function compareColors(hex1, hex2) {
    // get red/green/blue int values of hex1
    var r1 = parseInt(hex1.substring(0, 2), 16);
    var g1 = parseInt(hex1.substring(2, 4), 16);
    var b1 = parseInt(hex1.substring(4, 6), 16);
    // get red/green/blue int values of hex2
    var r2 = parseInt(hex2.substring(0, 2), 16);
    var g2 = parseInt(hex2.substring(2, 4), 16);
    var b2 = parseInt(hex2.substring(4, 6), 16);
    // calculate differences between reds, greens and blues
    var r = 255 - Math.abs(r1 - r2);
    var g = 255 - Math.abs(g1 - g2);
    var b = 255 - Math.abs(b1 - b2);
    // limit differences between 0 and 1
    r /= 255;
    g /= 255;
    b /= 255;
    // 0 means opposit colors, 1 means same colors
    return (r + g + b) / 3;
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
