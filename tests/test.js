'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var htmlify = require('../index');

it('should handle a no angular file', function (cb) {
    var stream = htmlify();
    var filename = './tests/fixtures/noangular.html';

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
    var filename = './tests/fixtures/angular-basic.html';

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
    var filename = './tests/fixtures/angular-complex.html';

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
        //handle a <ng-include> directive
        assert(/<data-ng-include/.test(contents));
        //test that ng-if doesn't appear
        assert(!/<ng-include/.test(contents));
        //handle a <ng-include> directive
        assert(/<data-ng-pluralize/.test(contents));
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
    var filename = './tests/fixtures/angular-complex.html';

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

it('should work with custom prefixes', function (cb) {
    var stream = htmlify({
        customPrefixes: ['ui-', 'gijo-']
    });
    var filename = './tests/fixtures/angular-custom.html';

    stream.on('data', function (file) {
        //make sure ng-app turned into data-ng-app
        var contents = file.contents.toString('utf8');

        //test that ui-router is handled
        assert(/data-ui-router/.test(contents));
        assert(!/[^-]ui-router/.test(contents));

        //test that data-ng appears
        assert(/\s+data-gijo-loader/.test(contents));
        assert(!/\s+gijo-loader/.test(contents));
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

it('should not modify ng-template script', function (cb) {
    var stream = htmlify();
    var filename = './tests/fixtures/angular-templates.html';

    stream.on('data', function (file) {
        //make sure ng-app turned into data-ng-app
        var contents = file.contents.toString('utf8');
        //validate that ng-templates don't change
        assert(/type="text\/ng-template"/.test(contents));
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
