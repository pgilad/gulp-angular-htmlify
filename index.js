'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (params) {
    //perhaps in the future
    params = params || {};
    var verbose = params.verbose || false;
    var htmlify = require('angular-html5')({
        customPrefixes: params.customPrefixes
    });

    return through.obj(function (file, enc, cb) {
        //pass through
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        //streams not supported
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-angular-htmlify', 'Streaming not supported'));
            return cb();
        }

        var data = file.contents.toString('utf8');
        //if ng-directives exist
        if (htmlify.test(data)) {
            data = htmlify.replace(data);
            //put contents back
            file.contents = new Buffer(data);
            if (verbose) {
                //get filename or unknown
                var filename = file.path ? gutil.colors.magenta(file.path) : gutil.colors.red('unknown');
                //log replaced
                gutil.log(gutil.colors.blue('angular-htmlify') + ' found and replaced ng-directives in ' + filename);
            }
        }

        //push back file to stream
        this.push(file);
        return cb();
    });
};
