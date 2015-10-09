var gulp      = require('gulp');
var concat    = require('gulp-concat');
var gutil     = require('gulp-util');
var order     = require('gulp-order');
var config    = require('../config/vendor');


gulp.task('vendor', function() {
  return gulp.src(config.jsSrc + '*/*.js')
    .pipe(order(config.orderedFiles, {'base': config.jsSrc}))
    .pipe(concat(config.jsDestName))
    .pipe(gulp.dest(config.jsDest));
});
