# [gulp](https://github.com/wearefractal/gulp)-angular-htmlify

> Change your ng-attributes to data-ng-attributes for html5 validation

[![NPM Version](http://img.shields.io/npm/v/gulp-angular-htmlify.svg)](https://npmjs.org/package/gulp-angular-htmlify)
[![NPM Downloads](http://img.shields.io/npm/dm/gulp-angular-htmlify.svg)](https://npmjs.org/package/gulp-angular-htmlify)
[![Dependencies](http://img.shields.io/gemnasium/pgilad/gulp-angular-htmlify.svg)](https://gemnasium.com/pgilad/gulp-angular-htmlify)
[![Build Status](https://travis-ci.org/pgilad/gulp-angular-htmlify.svg?branch=master)](https://travis-ci.org/pgilad/gulp-angular-htmlify)

Ever tried to run an Angular html page into w3c validator? Yeah it's a mess.

The solution everyone recommends is to add `data` to all your `ng` directives.
Now with `gulp` this can be easily made part of your build flow, similar to how
ng-min is to creating minfiable Angular syntax.

**Turn this:**
```html
<html ng-app="myApp">
...
<body ng-controller="MainCtrl">
</body>
</html>
```

**Into this:**
```html
<html data-ng-app="myApp">
...
<body data-ng-controller="MainCtrl">
</body>
</html>
```
#### <img src="http://www.w3.org/html/logo/downloads/HTML5_Logo_256.png" alt="HTML5 Valid" width="64" height="64"/>

## Install

Install with [npm](https://npmjs.org/package/gulp-angular-htmlify)

```
npm install --save-dev gulp-angular-htmlify
```

## Example

```js
var gulp = require('gulp');
var htmlify = require('gulp-angular-htmlify');

gulp.task('htmlify', function() {
    gulp.src('public/**/*.html')
        .pipe(htmlify())
        .pipe(gulp.dest('build/'));
});
```

## API

### htmlify(params)

params is an object that contains the following settings:

#### verbose

Type: `Boolean`

Whether to log files that had ng-directives detected and replaced. (Useful for debugging).

Defaults to **false**.

Example usage:
```js
//...
.pipe(htmlify({
    verbose:true
    }))
// --> [gulp] Found and replaced ng-directives in index.html
//...
```

## License

MIT ©2014 **Gilad Peleg**
