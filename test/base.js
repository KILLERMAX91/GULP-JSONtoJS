var gulp = require('gulp');
var JSONtoJS = require('../index');
var read = require('read-file');
var gutil = require('gulp-util');


var base = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS())
        .pipe(gulp.dest('./test/cache/test1'));
};
gulp.task('base', ['base2'], base);


var base2 = function () {
    return gulp.src('./test/modele/base.json')
        .pipe(JSONtoJS({nameVariableSufix:'Suffix'}))
        .pipe(gulp.dest('./test/cache/test2'));
};
gulp.task('base2', [], base2);

function isEqual(file1, file2, message){
    var actual = read.sync(file1, 'utf8');
    var expected = read.sync(file2, 'utf8');


    if(actual==expected){
        gutil.log('yes');
    }else{
        gutil.log('no ===> '+message);
    }
}
//DEBUT TEST UNITAIRE
isEqual('./test/actual/test1/base.js', './test/cache/test1/base.js', 'create file test1: FAILED');


isEqual('./test/actual/test2/base.js', './test/cache/test2/base.js', 'create file test2: FAILED');