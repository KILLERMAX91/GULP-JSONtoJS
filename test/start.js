
var gulp = require('gulp');



var buildTask = function(cb) {
    var gulpSequence = require('gulp-sequence');

    gulpSequence( ['base'], cb)
};


gulp.task('start', [], buildTask);
