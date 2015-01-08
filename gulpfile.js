// Gulp dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var mincss = require('gulp-minify-css');
//var minimg = require('gulp-imagemin');
var srcmap = require('gulp-sourcemaps');

// vars
var scripts = [
  './helpers/*.js',
  './api/*.js',
  './*.js'
];
var jsng = [
  'assets/javascript/app.js',
  'assets/javascript/controllers/*.js'
];
var vendorScripts = [];
var styles = [];
var images = [];

gulp.task('minify', function(){
  gulp.src(jsng)
  //.pipe(srcmap.init())
  .pipe(uglify())
  .pipe(concat('application.js'))
  //.pipe(srcmap.write())
  .pipe(gulp.dest('./public/'));
});

gulp.task('lint', function() {
  gulp.src(scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Default
gulp.task('default', ['lint', 'minify']);
