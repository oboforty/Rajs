var Cookie = {
    get: function(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
        return null;
    },

    set: function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    delete: function(name) {
        this.createCookie(name,"",-1);
    },
};

var Params = {
    params: {},
    inited: false,
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

    get: function(name) {
        if (!this.inited) {this.init(); this.inited=true;}
        return this.params[name];
    },

    set: function(key, value) {
        key = encodeURI(key); value = encodeURI(value);

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
    }
};
Params.init();
