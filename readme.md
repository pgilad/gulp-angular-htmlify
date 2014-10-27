# [gulp](https://github.com/wearefractal/gulp)-angular-htmlify

> Change your ng-attributes to data-ng-attributes for HTML5 validation using [angular-html5](https://github.com/pgilad/angular-html5)

[![NPM Version](http://img.shields.io/npm/v/gulp-angular-htmlify.svg?style=flat)](https://npmjs.org/package/gulp-angular-htmlify)
[![NPM Downloads](http://img.shields.io/npm/dm/gulp-angular-htmlify.svg?style=flat)](https://npmjs.org/package/gulp-angular-htmlify)
[![Build Status](http://img.shields.io/travis/pgilad/gulp-angular-htmlify.svg?style=flat)](https://travis-ci.org/pgilad/gulp-angular-htmlify)

*Issues with the output should be reported on the angular-html5 [issue tracker](https://github.com/pgilad/angular-html5/issues).*

## Install

Install with [npm](https://npmjs.org/package/gulp-angular-htmlify)

```sh
npm install --save-dev gulp-angular-htmlify
```

## Usage

```js
var gulp = require('gulp');
var htmlify = require('gulp-angular-htmlify');

//simple usage
gulp.task('htmlify', function() {
    gulp.src('public/**/*.html')
        .pipe(htmlify())
        .pipe(gulp.dest('build/'));
});

//using jade as a pre-processer
gulp.task('htmlify', function() {
    gulp.src('partials/**/*.jade')
        .pipe(jade())
        .pipe(htmlify())
        .pipe(gulp.dest('build/'));
});

//Also transforming ui-attributes to data-ui-attributes
gulp.task('htmlify', function() {
    gulp.src('public/**/*.html')
        .pipe(htmlify({
            customPrefixes: ['ui-']
        }))
        .pipe(gulp.dest('build/'));
});
```

## Options

See the `angular-html5` [options](https://github.com/pgilad/angular-html5#api)

### Additional Options

#### verbose

Type: `Boolean`

Default: `false`

Whether to log files that had ng-directives detected and replaced. (Useful for debugging).

Example usage:
```js
//...
.pipe(htmlify({
    verbose: true
    }))
// --> [gulp] Found and replaced ng-directives in index.html
//...
```

## License

MIT @[Gilad Peleg](http://giladpeleg.com)
