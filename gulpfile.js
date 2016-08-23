var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');

var config = [

]


gulp.task('clean', function() {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('eslint', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('bfy', function() {
  return browserify({
      entry: ['./src/js/index.js','./src/js/index2.js','./src/js/index3.js'],
      extensions: ['.js'],
      debug: true,
      transform: {
        'babel': babelify
      }
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', function(){
  var bundleThis = function(srcArray) {
    console.log(srcArray);
    srcArray.forEach(function(e) {
      var bundle = browserify(['./src/js/' + e + '.js']).transform(babelify).bundle();
      bundle.pipe(source(e + '_bundle.js'))
        .pipe(gulp.dest('./dist/js'));
    });
  };
  bundleThis(['index', 'index2', 'index3']);
});



gulp.task('scss', function() {
  return sass('./src/scss/pages/*.scss', { style: 'expanded' })
    .pipe(gulp.dest('dist/css'))
    .pipe(autoprefixer({
      browsers: ['ios 4', 'ios 5', 'ios 6', 'android 4', 'android 2.2', 'Safari 6', 'Safari 7'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('babel', function() {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./src/js-combiled'));
});

gulp.task('jshint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('pug', function() {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/pages/*.scss', ['scss']);
  // gulp.watch('./src/js/*.js', ['babel']);
  // gulp.watch('./src/js/*.js', ['bfy']);
  gulp.watch('./src/pug/*.pug', ['pug']);
});

gulp.task('default', ['clean', 'scss', 'js', 'pug']);
