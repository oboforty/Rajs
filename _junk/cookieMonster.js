
var CM = {
    params: {},
    init: function() {
        var prmstr = window.location.search.substr(1);
        if (prmstr != null) {
            var prmarr = prmstr.split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                this.params[tmparr[0]] = tmparr[1];
            }
        }
    },

	getCookie: function(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
        return null;
    },

    createCookie: function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    deleteCookie: function(name) {
        this.createCookie(name,"",-1);
    },

    get: function(name) {
        return this.params[name];
    },
};
CM.init();