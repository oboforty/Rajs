
$.slos.loadedPrograms["redirect"] = function(options) {
    this.slos = null;
    this.urlformat = options.urlformat;
    this.newWindow = options.newWindow;

    this.args = function(args) {
        var url = ejs.render(this.urlformat, args);

        if(this.newWindow)
            window.open(url);
        else
            window.location = url;
    }
};