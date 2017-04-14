# gulp-json-to-js

gulp-json-to-js is a [gulp](https://github.com/wearefractal/gulp) plugin to converted JSON to js files easily.

you should install `npm install gulp-json-to-js`
### Exemple

```javascript
var base = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS())
        .pipe(gulp.dest('./test/cache/test1'));
};
gulp.task('base', [], base);
```

**or**

```javascript
var base = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS({nameVariableSufix:'Suffix'}))
        .pipe(gulp.dest('./test/cache/test1'));
};
gulp.task('base', [], base);
```
for rename the end variable.
