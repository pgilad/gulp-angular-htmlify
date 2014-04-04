'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var htmlify = require('./index');

it('should handle a no angular file', function (cb) {
    var stream = htmlify();
    var filename = './fixtures/noangular.html';

    stream.on('data', function (file) {
        //make sure file was not changed
        assert.equal(file.contents.toString(), testFile.toString());
    });

    stream.on('end', cb);

    var testFile = fs.readFileSync(filename);

    stream.write(new gutil.File({
        contents: new Buffer(testFile.toString())
    }));

    stream.end();
});

it('should handle a basic angular app', function (cb) {
    var stream = htmlify();
    var filename = './fixtures/angular-basic.html';

    stream.on('data', function (file) {
        //make sure ng-app turned into data-ng-app
        var contents = file.contents.toString('utf8');
        //test that data-ng appears
        assert(/\s+data-ng-app/.test(contents));
        //test that ng-app doesn't appear
        assert(!/\s+ng-app/.test(contents));
    });

    stream.on('end', cb);

    var testFile = fs.readFileSync(filename);

    stream.write(new gutil.File({
        contents: new Buffer(testFile.toString())
    }));

    stream.end();
});

it('should handle a complex angular app', function (cb) {
    var stream = htmlify();
    var filename = './fixtures/angular-complex.html';

    stream.on('data', function (file) {
        //make sure ng-app turned into data-ng-app
        var contents = file.contents.toString('utf8');
        //test that data-ng appears
        assert(/\s+data-ng-app/.test(contents));
        //test that ng-app doesn't appear
        assert(!/\s+ng-app/.test(contents));
        //test that ng-controller is transormed
        assert(/\s+data-ng-controller/.test(contents));
        //test that ng-controller doesn't appear
        assert(!/\s+ng-controller/.test(contents));
        //test that ng-if is transormed
        assert(/\s+data-ng-if/.test(contents));
        //test that ng-if doesn't appear
        assert(!/\s+ng-if/.test(contents));
    });

    stream.on('end', cb);

    var testFile = fs.readFileSync(filename);

    stream.write(new gutil.File({
        path: filename,
        cwd: '.',
        contents: new Buffer(testFile.toString())
    }));

    stream.end();
});

it('should not change anything other than angular directives', function (cb) {
    var stream = htmlify();
    var filename = './fixtures/angular-complex.html';

    stream.on('data', function (file) {
        //make sure ng-app turned into data-ng-app
        var contents = file.contents.toString('utf8');

        //lets change the directives back, and verify file is the same
        contents.replace(/data-ng-/gi, 'ng-');
        assert(contents, testFile.toString());
    });

    stream.on('end', cb);

    var testFile = fs.readFileSync(filename);

    stream.write(new gutil.File({
        contents: new Buffer(testFile.toString())
    }));

    stream.end();
});
