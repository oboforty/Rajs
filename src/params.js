
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

    get: function(name, default) {
        if (!this.inited) {this.init(); this.inited=true;}
        return this.params[name] || default;
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
