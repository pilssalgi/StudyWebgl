var gulp    = require('gulp');
var config  = require('../config');
var source      = require('vinyl-source-stream');
var browserSync = require('browser-sync');


var option = {
  server  : {baseDir: config.base.dest},
  port    : 8000,
  browser : "google chrome"
}

gulp.task('browserSync',['scss','js','minifyhtml'],function(){
  return browserSync.init(option);
});