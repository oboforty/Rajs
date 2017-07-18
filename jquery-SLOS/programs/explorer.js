
$.slos.loadedPrograms["explorer"] = function(options) {
    this.dependencies = ["jquery","slos","ejs","font-awesome"];
    this.slos = null;
	this.files = {};
    this.dirLevel = 0;
    this.template = options.template;
    this.fileId = 0;

    this.args = function(args) {
        if (typeof args === "string")
            this.container = $(args);
        else
            this.container = args;
    }

    this.getFAGroup = function(extension) {
        var fileext = extension.toLowerCase();

        if ("pdf" == fileext)
            return "pdf";
        else if (["doc","docx","odt"].indexOf(fileext) != -1)
            return "word";
        else if (["xls","xlsx","ods"].indexOf(fileext) != -1)
            return "excel";
        else if (["ppt","pptx","odp"].indexOf(fileext) != -1)
            return "ppt";
        else if (["mp3","cda","3ga","midi","mogg","ogg","wav","m4a","m4p","mid","m4p","raw","wma"].indexOf(fileext) != -1)
            return "audio";
        else if (["3g2","3gp","3gp2","f4v","flv","mp4","wmv","mp4v","avi","mpeg","mov"].indexOf(fileext) != -1)
            return "video";
        else if(['bmp','jpeg','jpg','pcx','psd','sgv','wmf','dxf','met','pgm','ras','svm','xbm','emf','pbm','plt','sda','tga','xpm','eps','pcd','png','sdd','tif','tiff','gif','pct','ppm','sgf','vor'].indexOf(fileext) != -1)
            return "image";
        else if (['txt', 'cs', 'js', 'jsx', 'tsx', 'ts', 'php', 'rb', 'r', 'py', 'asp', 'jsp', 'java', 'h', 'm', 'dat'].indexOf(fileext) != -1)
            return "code";
        else if (['zip', 'rar', 'iso', 'tar', 'bz2', 'gz', 'lz', '7z', 'apk', 'b1', 'cab', 'car', 'dmg', 'jar', 'pak', 'pea', 'tar.gz', 'tgz', 'tar.Z', 'tar.bz2', 'tbz2', 'tar.lzma', 'tlz', 'zipx', 'ace', 'tar', 'gz'].indexOf(fileext) != -1)
            return "zip";
        else
            return "";
    }

    this.addFileNames = function(fileNames, meta) {
        for (var i in fileNames) {
            var file = new $.slos.File(meta);

            file.type = "file";
            file.filename = fileNames[i];
            file.extension = $.slos.utils.getExtension(file.filename);
    		file.group = this.getFAGroup(file.extension);
    		file.slid = ++this.fileId;
    		this.files[file.slid] = file;
    	}

		this.container.html(ejs.render(this.template, {files:this.files}));
		this.slos.updateEvents();
    }

    this.args(options.container);
};