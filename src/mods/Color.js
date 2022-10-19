import { ColorUtil } from './ColorUtil';
import { Matrix } from './matrix';

export default class Color {

  clone() {
    var cc = new Color();
    cc.r = this.r;
    cc.g = this.g;
    cc.b = this.b;
    cc.a = this.a;
    return cc;
  }

  withalpha(transparency) {
    var c = this.clone();
    c.a = transparency;

    return c;
  }

  add(col) {
    var col0 = new Color();
    col0.r = clamp(this.r + col.r);
    col0.g = clamp(this.g + col.g);
    col0.b = clamp(this.b + col.b);
    col0.a = clamp((this.a??1) + (col.a??1));

    return col0;
  }
  
  sub(col) {
    var col0 = new Color();
    col0.r = clamp(this.r - col.r);
    col0.g = clamp(this.g - col.g);
    col0.b = clamp(this.b - col.b);
    col0.a = clamp((this.a??1) - (col.a??1));

    return col0;
  }

  blend(col, algorithm) {
    var col0 = new Color();
    var al = ColorUtil.blendmodes[algorithm];

    col0.r = clamp(Math.round(al(this.r, col.r)));
    col0.g = clamp(Math.round(al(this.g, col.g)));
    col0.b = clamp(Math.round(al(this.b, col.b)));

    return col0;
  }

  interpolate(col, p) {
    let cc = [];

    for (let i of range(3)) {
      let A = this.c[i], B = col.c[i];

      let rng = B-A, min = Math.min(A,B);
      cc[i] = Math.round(rng<0 ? (-rng*(1-p)) : rng*p + min);
    }

    return new Color(cc);
  }
  
  cmp(col) {
    var r = 255 - Math.abs(this.r - col.r);
    var g = 255 - Math.abs(this.g - col.g);
    var b = 255 - Math.abs(this.b - col.b);

    r /= 255;
    g /= 255;
    b /= 255;

    return (r + g + b) / 3;
  }

  shade(lum) {
    var hex = String(this.hex()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    var newHex = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substring(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        newHex += ("00"+c).substring(c.length);
    }

    return new Color(newHex);
  }
  
  get contrast() {
    return (this.yiq >= 128) ? 'black' : 'white';
  }

  get complement() {
    let [h,s,l] = this.to_hsl();
    
    h *= 360;
    h += 180;
    h = h % 360;

    return new Color(`hsl(${round(h)},${round(s*100)}%,${round(l*100)}%)`);
  }

  get yiq() {
    return ((this.r * 299) + (this.g * 587) + (this.b * 114)) / 1000;
  }

  get rgba() {
    return `rgba(${round(this.r)},${round(this.g)},${round(this.b)},${round(this.a??1)})`;
  }

  get rgb() {
    return `rgb(${round(this.r)},${round(this.g)},${round(this.b)})`;
  }

  get hsl() {
    let [h,s,l] = this.to_hsl();

    return `hsl(${round(h*360)},${round(s*100)}%,${round(l*100)}%)`;
  }

  get hsv() {
    let [h,s,v] = this.to_hsv();

    return `hsv(${round(h*360)},${round(s*100)}%,${round(v*100)}%)`;
  }

  get hex() {
    var r = clamp(round(this.r)).toString(16);
    var g = clamp(round(this.g)).toString(16);
    var b = clamp(round(this.b)).toString(16);
    return "#" + (r.length == 1 ? "0" + r : r)+(g.length == 1 ? "0" + g : g)+(b.length == 1 ? "0" + b : b);
  }

  to_array(cs) {
    let arr = null;

    switch(cs) {
      case null: case 'rgb': case 'rgba': return this.c.splice(0); break;
      case 'hsv': case 'hsb': return this.to_hsv(); break;
      case 'hsl': return this.to_hsl(); break;
      case 'yuv': return this.to_yuv(); break;
    }

    return arr;
  }

  to_hsl() {
    let [r,g,b] = [this.r,this.g,this.b];
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
  }

  to_hsv() {
    let [r,g,b] = [this.r,this.g,this.b];
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
  }

  to_yuv() {
    let m = new Matrix([
      [ 0.2126, 0.7152, 0.0722    ],
      [ -0.09991, -0.33609, 0.436 ],
      [ 0.615, -0.55861, -0.05639 ]
    ]).mul( Matrix.cvector( this.c ) );

    return [m.m[0][0],m.m[1][0],m.m[2][0]];
  }

  constructor(...rgba) {
    if (len(rgba) == 1)
      var rgba = rgba[0];
    else if (len(rgba) == 0)
      var rgba = [0,0,0,1];

    const t = typeof rgba;

    if (Array.isArray(rgba))
      this.c = rgba;
    else if (t === 'object')
      this.c = [rgba.r, rgba.g, rgba.b, rgba.a??1];
    else if (t === 'string') {
      let [cs, col] = ColorUtil.cs_parse(rgba.toLowerCase());

      if (cs == null)
        console.error("Could not parse string as color: " + rgba);

      this.c = col;
    } else if (t === 'number') {
      var num = rgba*2654435761 % Math.pow(2, 32);
      num >>>= 0;
      if (!this.a) this.push(0);
      this.b = num & 0xFF;
      this.g = (num & 0xFF00) >>> 8;
      this.r = (num & 0xFF0000) >>> 16;
      this.a = ( (num & 0xFF000000) >>> 24 ) / 255;
    }
  }

  static clamp(n){
    if(n<0){return(0);}
    if(n>255){return(255);}
    return n;
  }
  
  static from_yuv(...yuv) {
    // BT.709 YUV space
    // Wr = 0.2126 Wb = 0.0722
    const ca = Matrix([
      [ 1, 0, 1.28033 ],
      [ 1, -0.21482, -0.38059 ],
      [ 1, 2.12798, 0 ],
    ]).mul( Matrix.cvector(yuv)).transpose().to_array()[0];

    return new Color(ca.map(round).map(Color.clamp));
  }

  static from_hsl(h,s,l) {
    return new Color(...ColorUtil.hsl2rgb_arr(h,s,l));
  }

  toString() {
    return this.rgba;
  }
}
