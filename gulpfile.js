// Gulp dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var mincss = require('gulp-minify-css');
var srcmap = require('gulp-sourcemaps');
// var minimg = require('gulp-imagemin');

// vars
var scripts = [
  './helpers/*.js',
  './api/*.js',
  './core/*.js',
  './*.js',
  'assets/javascript/*',
  'assets/javascript/services/*.js',
  'assets/javascript/controllers/*.js',
  'test/*.js',
  'test/e2e/*.js',
  'test/helpers/*.js'
];
var jsng = [
  'assets/javascript/app.js',
  'assets/javascript/services/*.js',
  'assets/javascript/controllers/*.js'
];
var styles = ['assets/styles/*.css'];

gulp.task('lint', function() {
  gulp.src(scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('minify', function(){
  gulp.src(jsng)
  .pipe(srcmap.init())
  .pipe(uglify())
  .pipe(concat('application.min.js'))
  .pipe(srcmap.write())
  .pipe(gulp.dest('./public/'));
});

gulp.task('styles', function() {
  gulp.src(styles)
  .pipe(concat('application.min.css'))
  .pipe(mincss())
  .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
  gulp.watch(scripts, ['lint']);
  gulp.watch(jsng, ['lint']);
  gulp.watch(jsng, ['minify']);
  gulp.watch(styles, ['styles']);
  gulp.watch(scripts, ['app']);
});

gulp.task('core', function(done) {
 var core = require('./core/index');
 core(done);
});

gulp.task('app', function() {
  var cfg = require('./config.json').port;
  var api = require('./api/routes');
  var svr = require('./web/routes').svr;
  var sio = require('./sio/routes');

  api.listen(cfg.api, function() {});
  svr.listen(cfg.web, function() {});
  sio.listen(function() {});
});

// Default
gulp.task('default',[
  'watch',
  'lint',
  'minify',
  'styles',
  'app'
]);
