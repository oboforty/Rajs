
export const ColorUtil = {
  colors: {"white":"#ffffff","violet":"#ee82ee","yellow":"#ffff00","gold":"#ffd700","gray":"#808080","green":"#008000","blue":"#0000ff","red":"#ff0000","black":"#000000","crimson":"#dc143c","cyan":"#00ffff","magenta":"#ff00ff","maroon":"#800000","orange":"#ffa500","olive":"#808000","navy":"#000080","tomato":"#ff6347","turquoise":"#40e0d0","teal":"#008080","salmon":"#fa8072","silver":"#c0c0c0","skyblue":"#87ceeb","snow":"#fffafa","pink":"#ffc0cb","purple":"#800080","wheat":"#f5deb3","azure":"#f0ffff","aqua":"#00ffff","indigo":"#4b0082","khaki":"#f0e68c","darkgray":"#a9a9a9"},

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
  },

  hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  },

  hsl2rgb_arr(h,s,l) {
    var r,g,b;
    let c = [0,0,0];

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }

    r = round(r*255);
    g = round(g*255);
    b = round(b*255);
    
    return c;
  },

  cs_parse(rgba) {
    let c = [];

    var matchFormat = /rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
    var match = matchFormat.exec(rgba);
    if (match !== null) {
      r = match[1];
      g = match[2];
      b = match[3];
      return ['rgb', c];
    }

    var matchFormat = /rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/;
    var match = matchFormat.exec(rgba);
    if (match !== null) {
      r = match[1];
      g = match[2];
      b = match[3];
      a = match[4];
      return ['rgba', c];
    }

    var matchFormat = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var match = matchFormat.exec(rgba);
    if (match !== null) {
      r = parseInt(match[1], 16);
      g = parseInt(match[2], 16);
      b = parseInt(match[3], 16);
      return ['hex', c];
    }

    var matchFormat = /hsv\((\d{1,3}),\s?(\d{1,3}\%),\s?(\d{1,3}\%)\)/;
    var match = matchFormat.exec(rgba);
    if (match !== null) {
      var r, g, b;
      let h = match[1]/360;
      let s = match[2].substring(0,match[2].length-1) / 100;
      let v = match[3].substring(0,match[3].length-1) / 100;

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

      r = round(r*255);
      g = round(g*255);
      b = round(b*255);
      return ['hsv', c];
    }

    var matchFormat = /hsl\((\d{1,3}),\s?(\d{1,3}\%),\s?(\d{1,3}\%)\)/;
    var match = matchFormat.exec(rgba);
    if (match !== null) {
      let h = match[1]/360;
      let s = match[2].substring(0,match[2].length-1) / 100;
      let l = match[3].substring(0,match[3].length-1) / 100;

      return ['hsl', this.hsl2rgb_arr(h,s,l)];
    }

    return [null, null];
  }
};
