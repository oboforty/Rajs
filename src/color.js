
var Color = function (rgba) {

  this.add = function(col) {
    var col0 = new Color(true);
    col0[0] = clamp(this[0] + col[0]);
    col0[1] = clamp(this[1] + col[1]);
    col0[2] = clamp(this[2] + col[2]);
    col0[3] = clamp((this[3]||1) + (col[3]||1));
  };
  
  this.sub = function(col) {
    var col0 = new Color(true);
    col0[0] = clamp(this[0] - col[0]);
    col0[1] = clamp(this[1] - col[1]);
    col0[2] = clamp(this[2] - col[2]);
    col0[3] = clamp((this[3]||1) - (col[3]||1));
  };

  this.blend = function(col, algorithm) {
    var col0 = new Color();
    var al = ColorUtil.blendmodes[algorithm];
    col0[0] = clamp(Math.round(al(this[0], col[0])));
    col0[1] = clamp(Math.round(al(this[1], col[1])));
    col0[2] = clamp(Math.round(al(this[2], col[2])));

    return col0;
  };

  this.interpolate = function(col, p) {
    let cc = [];

    for (let i of range(3)) {
      let A = this[i], B = col[i];

      let rng = B-A, min = Math.min(A,B);
      cc[i] = Math.round(rng<0 ? (-rng*(1-p)) : rng*p + min);
    }

    return new Color(cc);
  };
  
  this.cmp = function(col) {
    var r = 255 - Math.abs(this[0] - col[0]);
    var g = 255 - Math.abs(this[1] - col[1]);
    var b = 255 - Math.abs(this[2] - col[2]);

    r /= 255;
    g /= 255;
    b /= 255;

    return (r + g + b) / 3;
  };

  this.shade = function(lum) {
    var hex = String(this.hex()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    var newHex = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        newHex += ("00"+c).substr(c.length);
    }

    return new Color(newHex);
  };
  
  this.contrast = function() {
    return (this.yiq() >= 128) ? 'black' : 'white';
  };

  this.complement = function() {
    let [h,s,l] = this.to_hsl();
    
    h *= 360;
    h += 180;
    h = h % 360;

    return new Color(`hsl(${round(h)},${round(s*100)}%,${round(l*100)}%)`);
  };

  this.a = function(transparency) {
    var c = this.clone();
    c[3] = transparency;
    return c;
  };
  
  this.yiq = function() {
    return ((this[0] * 299) + (this[1] * 587) + (this[2] * 114)) / 1000;
  };

  this.rgba = function() {
    if (typeof this[3] !== 'undefined')
      return 'rgba('+this[0]+','+this[1]+','+this[2]+','+this[3]+')';
    else
      return 'rgb('+this[0]+','+this[1]+','+this[2]+')';
  };

  this.rgb = function() {
    return 'rgb('+this[0]+','+this[1]+','+this[2]+')';
  };

  this.hsl = function() {
    let [h,s,l] = this.to_hsl();

    return `hsl(${round(h*360)},${round(s*100)}%,${round(l*100)}%)`;
  };

  this.hsv = function() {
    let [h,s,v] = this.to_hsv();

    return `hsv(${round(h*360)},${round(s*100)}%,${round(l*100)}%)`;
  };

  this.to_yuv = function() {
    console.log(this.to_array(), cvector( this.to_array() ));

    return matrix([
      [  0.299   ,  0.587   , 0.114   ],
      [ -1.14713 , -0.28886 , 0.436   ],
      [  0.615   , -0.51499 , 0.10001 ]
    ]).mul( cvector( this.to_array() ) );
  };

  this.to_hsl = function() {
    let [r,g,b] = this;
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [ h, s, l ];
  };

  this.to_hsv = function() {
    let [r,g,b] = this;
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [ h, s, v ];
  };

  this.hex = function() {
    var r = this[0].toString(16);
    var g = this[1].toString(16);
    var b = this[2].toString(16);
    return "#" + (r.length == 1 ? "0" + r : r)+(g.length == 1 ? "0" + g : g)+(b.length == 1 ? "0" + b : b);
  };

  this.clone = function() {
    var cc = new Color(Boolean(this[3]));
    cc[0] = this[0];
    cc[1] = this[1];
    cc[2] = this[2];
    cc[3] = this[3];
    return cc;
  };

  this.to_array = function() {
    let arr = [this[0], this[1], this[2]];

    if (this[3])
      arr.push(this[3]);

    return arr;
  };

  (function(rgba) {
    this.push(0);
    this.push(0);
    this.push(0);

      if (typeof rgba === 'undefined')
        return;
      if (typeof rgba == 'string') {
        rgba = rgba.toLowerCase();

        var matchFormat = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
        var match = matchFormat.exec(rgba);
        if (match !== null) {
          this[0] = match[1];
          this[1] = match[2];
          this[2] = match[3];
          return;
        }

        var matchFormat = /rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
        var match = matchFormat.exec(rgba);
        if (match !== null) {
          this[0] = match[1];
          this[1] = match[2];
          this[2] = match[3];
          this[3] = match[4];
          return;
        }

        var matchFormat = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        var match = matchFormat.exec(rgba);
        if (match !== null) {
          this[0] = parseInt(match[1], 16);
          this[1] = parseInt(match[2], 16);
          this[2] = parseInt(match[3], 16);
          return;
        }

        var matchFormat = /hsv\((\d{1,3}),\s?(\d{1,3}\%),\s?(\d{1,3}\%)\)/;
        var match = matchFormat.exec(rgba);
        if (match !== null) {
          var r, g, b;
          let h = match[1]/360;
          let s = match[2].substr(0,match[2].length-1) / 100;
          let v = match[3].substr(0,match[3].length-1) / 100;

          var i = Math.floor(h * 6);
          var f = h * 6 - i;
          var p = v * (1 - s);
          var q = v * (1 - f * s);
          var t = v * (1 - (1 - f) * s);

          switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
          }

          this[0] = round(r*255);
          this[1] = round(g*255);
          this[2] = round(b*255);
          return;
        }

        var matchFormat = /hsl\((\d{1,3}),\s?(\d{1,3}\%),\s?(\d{1,3}\%)\)/;
        var match = matchFormat.exec(rgba);
        if (match !== null) {
          var r, g, b;
          let h = match[1]/360;
          let s = match[2].substr(0,match[2].length-1) / 100;
          let l = match[3].substr(0,match[3].length-1) / 100;

          if (s == 0) {
            r = g = b = l; // achromatic
          } else {
            function hue2rgb(p, q, t) {
              if (t < 0) t += 1;
              if (t > 1) t -= 1;
              if (t < 1/6) return p + (q - p) * 6 * t;
              if (t < 1/2) return q;
              if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
          }

          this[0] = round(r*255);
          this[1] = round(g*255);
          this[2] = round(b*255);
          return;
        }

        console.error("Could not parse string as color: " + rgba);
      }

      if (rgba.constructor.name == 'Color' || Array.isArray(rgba)) {
        this[0] = rgba[0];
        this[1] = rgba[1];
        this[2] = rgba[2];
      } else if (typeof rgba === 'boolean') {
        if (rgba === true)
         this.push(0);
      } else if (typeof rgba === 'number') {
        var num = rgba*2654435761 % Math.pow(2, 32);
        num >>>= 0;
        if (!this[3]) this.push(0);
        this[2] = num & 0xFF;
        this[1] = (num & 0xFF00) >>> 8;
        this[0] = (num & 0xFF0000) >>> 16;
        this[3] = ( (num & 0xFF000000) >>> 24 ) / 255;
      } else if (typeof rgba === 'object') {
        if (rgba.r) this[0] = rgba.r;
        if (rgba.g) this[1] = rgba.g;
        if (rgba.b) this[2] = rgba.b;
        if (rgba.a) this.push(rgba.a);
      }
  }).bind(this)(arguments.length > 1 ? list(arguments) : rgba);
};

Color.prototype = Array.prototype;

function clamp(n){
  if(n<0){return(0);}
  if(n>255){return(255);}
  return n;
}

function from_yuv(y,u,v) {
  const ca = matrix([
    [ 1.0  ,  0.0     ,  1.13983 ],
    [ 1.0  , -0.39465 , -0.58060 ],
    [ 1.0  ,  2.03211 ,  0.0     ]
  ]).mul(cvector([y,u,v])).transpose().to_array()[0];

  return new Color(ca.map(round).map(clamp));
}

var ColorUtil = {
  colors: {"badass":"#bada55","aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"
  },

  blendmodes: {
    none: function(base, adj) { return base; },
    normal: function(base, adj) { return adj; },
    //
    darken: function(base, adj) { return Math.min(base, adj); },
    multiply: function(base, adj) { return ((base * adj) / 255); },
    colorburn: function(base, adj) { return adj <= 0 ? 0 : Math.max(255 - ((255 - base) * 255 / adj), 0); },
    linearburn: function(base, adj) { return Math.max(0, (base + adj - 255)); },
    //
    lighten: function(base, adj) { return Math.max(base, adj); },
    screen: function(base, adj) { return (255 - (((255 - base) * (255 - adj)) / 255)); },
    colordodge: function(base, adj) { return adj >= 255 ? 255 : Math.min(base * 255 / (255 - adj), 255); },
    lineardodge: function(base, adj) { return Math.min((base + adj), 255); },
    //
    overlay: function(base, adj) { return (base < 128) ? ((2 * base * adj) / 255) : (255 - (2 * (255 - base) * (255 - adj) / 255)); },
    softlight: function(base, adj) { return (base < 128) ? (((adj>>1) + 64) * base * (2/255)) : (255 - (191 - (adj>>1)) * (255 - base) * (2 / 255)); },
    hardlight: function(base, adj) { return adj < 128 ? (2 * base * adj) / 255 : 255 - ((2 * (255 - base) * (255 - adj)) / 255); },
    //
    difference: function(base, adj) { return Math.abs(base - adj); },
    exclusion: function(base, adj) { return 255 - (((255 - base) * (255 - adj) / 255) + (base * adj / 255)); },
    subtract: function(base, adj) { return Math.max((base - adj), 0); },
    //
    inbetween: function(base, adj) { return (base+adj)/2; }
  }
};
