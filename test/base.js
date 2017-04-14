var gulp = require('gulp');

var JSONtoJS = require('../index');


var base = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS())
        .pipe(gulp.dest('./test/cache/test1'));
};
gulp.task('base', ['base2'], base);

var base2 = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS())
        .pipe(gulp.dest('./test/cache/test2'));
};
gulp.task('base2', [], base2);