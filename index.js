'use strict';
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (params) {
    //perhaps in the future
    params = params || {};
    var verbose = params.verbose || false;
    var customPrefixes = params.customPrefixes || [];

    //find ng-something by default
    var prefix = 'ng-';
    //optionally add custom prefixes
    if (customPrefixes && customPrefixes.length) {
        var additions = customPrefixes.join('|');
        prefix += '|';
        prefix += additions;
    }

    //wrap around to insert into replace str later
    prefix = '(' + prefix + '){1}';

    //handle the following:
    //1. ' ng-'
    //2. '<ng-'
    //3. '</ng-'
    var allowedPreChars = '(\\s|<|<\/){1}';
    //build find/replace regex
    //$1 -> allowable pre-chars
    //$2 -> prefix match
    //$3 -> actual directive (partially)
    var replaceRegex = new RegExp(allowedPreChars + prefix + '(\\w+)', 'ig');

    //replace with data-ng-something
    var replaceStr = '$1data-$2$3';

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
