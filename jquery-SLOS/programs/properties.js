
$.slos.loadedPrograms["redirect"] = function(options) {
    this.slos = null;
    this.container = options.container;
    this.content = options.content;
    this.urlformat = options.urlformat;
    this.newWindow = options.newWindow;

    this.args = function(args) {
        console.log(args)
        var url = ejs.render(this.urlformat, args);

        if(this.newWindow)
            window.open(url);
        else
            window.location = url;
    }
};