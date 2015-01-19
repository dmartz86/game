// Gulp dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var mincss = require('gulp-minify-css');
// var minimg = require('gulp-imagemin');
// var srcmap = require('gulp-sourcemaps');

// vars
var scripts = [
  './helpers/*.js',
  './api/*.js',
  './*.js',
  'assets/javascript/*',
  'assets/javascript/services/*.js',
  'assets/javascript/controllers/*.js'
];
var jsng = [
  'assets/javascript/app.js',
  'assets/javascript/services/*.js',
  'assets/javascript/controllers/*.js'
];
// var vendorScripts = [];
var styles = ['assets/styles/*.css'];
// var images = [];

gulp.task('lint', function() {
  gulp.src(scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('minify', function(){
  gulp.src(jsng)
  //.pipe(srcmap.init())
  .pipe(uglify())
  .pipe(concat('application.js'))
  //.pipe(srcmap.write())
  .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function() {
  gulp.src(styles)
  .pipe(concat('application.css'))
  .pipe(mincss())
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch(scripts, ['lint']);
  gulp.watch(jsng, ['lint']);
  gulp.watch(jsng, ['minify']);
  gulp.watch(styles, ['styles']);
});

// Default
gulp.task('default', ['watch', 'lint', 'minify', 'styles']);
