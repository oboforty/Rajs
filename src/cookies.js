const Cookies = (function() {

  return new Proxy({
    persistent: true,

    set: function(name, value, hours) {
      let ckc = name + "=" + value + "; path=/";
      let date = new Date();


      if (typeof hours === 'number') {
        // hours is provided
        date.setTime(date.getTime() + (hours*3600*1000));
        ckc += "; expires=" + date.toUTCString();
      } else if (hours) {
        // hours is a flag to be "persistent" cookie
        date.setFullYear(date.getFullYear() + 1);
        ckc += "; expires=" + date.toUTCString();
      }

      document.cookie = ckc;
    },

    get: function(name, def) {
      let value = "; " + document.cookie;
      let parts = value.split("; " + name + "=");

      if (parts.length == 2) {
        return parts.pop().split(";").shift();
      } else {
        return def
      }
    },

  }, {

    get: function(target, name) {
      if (name == 'get')
        return target.get;
      else if (name == 'set')
        return target.set;
      return target.get(name);
    },

    set: function(target, name, val) {
      target.set(name, val, Boolean(target.persistent));

      return true;
    },

    has: function(target, name) {
      return Booolean(target.get(name));
    },

    deleteProperty: function(target, name) {
      target.set(name, "", -1);
    },
  });
})();
