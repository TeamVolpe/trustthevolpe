var gulp      = require('gulp');
var html      = require('../config/html');
var iconFont  = require('../config/iconFont');
var svgSprite = require('../config/svg-sprite');
var images    = require('../config/images');
var sass      = require('../config/sass');
var fonts     = require('../config/fonts');
var vendor    = require('../config/vendor');
var watch     = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  console.log('watching images');
  watch(images.src, function() { gulp.start('images'); });

  console.log('watching sass');
  watch(sass.src, function() { gulp.start('sass'); });

  console.log('watching iconFont');
  watch(iconFont.src, function() { gulp.start('iconFont'); });

  console.log('watching svgSprite');
  watch(svgSprite.src, function() { gulp.start('svg-sprite'); });

  console.log('watching fonts');
  watch(fonts.src, function() { gulp.start('fonts'); });

  console.log('watching html');
  watch(html.watch, function() { gulp.start('html'); });

  console.log('watching vendor');
  watch(vendor.watch, function() { gulp.start('vendor'); });
});
