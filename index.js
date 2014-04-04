'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(params) {
    //perhaps in the future
    params = params || {};
    var verbose = params.verbose || false;

    //find ng-something
    var replaceRegex = /(\s+)ng-(\w+)/ig;
    //replace with data-ng-something
    var replaceStr = '$1data-ng-$2';

    return through.obj(function(file, enc, cb) {
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
        if (replaceRegex.test(data)) {
            data = data.replace(replaceRegex, replaceStr);
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
