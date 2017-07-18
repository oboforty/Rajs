(function ($) {
    var __slice = Array.prototype.slice;

    var slos = {
        globals: {},
        instances: [],
        loadedPrograms: {},
        utils: {
            getExtension: function(filename) {
                var re = /(?:\.([^.]+))?$/;
                return re.exec(filename)[1];
            },
            getBasename: function(filename) {
                return '/'.join(filename.split(/[\\/]/).pop());
            },
        },
        File: function() {

        }
    };

    var SlosManager = function(options) {
        slos.instances.push(this);
        this.baseProgram = "viewer";
        this.baseProcess = null;
        this.programs = {};
        this.showlogo = options.showlogo;
        this.programConfigurations = {};
        this.processes = [];

        this.init = function(options) {
            this.container = options.container;

            if (typeof options.programs !== 'undefined') {
                for(var programName in options.programs) {
                    this.programs[programName] = slos.loadedPrograms[programName];
                    this.programConfigurations[programName] = options.programs[programName];
                }
            }

            if (options.baseProgram) {
                this.baseProgram = options.baseProgram;
                this.baseProcess = this.startProgram(this.baseProgram, this.container);
            }
        };

        this.error = function(str) {
            console.error(str);
        };

        this.start = function(program, file) {
            this.startProgram(program, file);
        };

        this.startProgram = function(programName, args) {
            if(typeof this.programs[programName] === 'undefined')
                return this.error("Program not found: " + programName);

            var program = new this.programs[programName](this.programConfigurations[programName]);
            program.slos = this;
            if (args) {
                program.args(args);
            }
            this.processes.push(program);

            return program;
        };

        this.updateEvents = function() {
            var self = this;
            $("[data-slos-select]").click(function(){
                var programName = $(this).attr('data-slos-select');
                var fileSLID = $(this).attr('data-slos-file');

                var file = self.baseProcess.files[fileSLID];
                self.startProgram(programName, {file:file});
            });
        };

        this.init(options);
    };

    $.fn.slos = function (options) {
        options.container = $(this);
        return new SlosManager(options);
    };
    $.slos = slos;
})(jQuery);
