
const Params = (function() {
  const trg = {};

  let prmstr = window.location.search.substr(1);

  if (prmstr != null) {
    let prmarr = prmstr.split("&");
    for (let i = 0; i < prmarr.length; i++) {
      let tmparr = prmarr[i].split("=");
      trg[tmparr[0]] = tmparr[1];
    }
  }

  return new Proxy(trg, {

    get: function(target, name) {
      return target[name];
    },

    set: function(target, name, val) {
      target[name] = value;

      var key = encodeURI(name), value = encodeURI(val);

      var kvp = document.location.search.substr(1).split('&');

      var i=kvp.length; var x; while(i--) 
      {
          x = kvp[i].split('=');

          if (x[0]==key)
          {
              x[1] = value;
              kvp[i] = x.join('=');
              break;
          }
      }

      if(i<0) {kvp[kvp.length] = [key,value].join('=');}

      //this will reload the page, it's likely better to store this until finished
      document.location.search = kvp.join('&'); 
    },

    has: function(target, name) {
      return name in  target;
    },

    deleteProperty: function(target, name) {
      delete target[name];
    },
  });
})();
