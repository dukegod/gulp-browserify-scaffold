
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');
// var config = [

// ]



gulp.task('compress', function (cb) {
  pump([
        gulp.src('./dist/js'),
        uglify(),
        gulp.dest('./dist/min')
    ],
    cb
  );
});


gulp.task('clean', function() {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});

gulp.task('eslint', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('babel', function() {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js-combiled'));
});
gulp.task('pug', function() {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist'));
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('scss', function() {
  return gulp.src('./src/scss/pages/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
    // .pipe(gulp.dest('dist/css'))
    .pipe(autoprefixer({
      browsers: ['ios 4', 'ios 5', 'ios 6', 'android 4', 'android 2.2', 'Safari 6', 'Safari 7'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({ stream: true }));
});



gulp.task('bfy', function() {
  return browserify({
      entry: ['./src/js/index.js'],
      extensions: ['.js'],
      debug: true,
      transform: {
        'babel': babelify
      }
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', function() {
  var bundleThis = function(srcArray) {
    console.log(srcArray);
    srcArray.forEach(function(e) {
      browserify(['./src/js/' + e + '.js'])
        .transform(babelify).bundle()
        .pipe(source(e + '-bundle.js'))
        .pipe(gulp.dest('./dist/js'));
    });
  };
  bundleThis(['index', 'test']);
});







// 静态服务器 + 监听 scss/html 文件
gulp.task('browsersync', function() {
  browserSync.init({
    server: './dist'
  });
  gulp.watch('./src/scss/pages/*.scss', ['scss']);
  gulp.watch('dist/*.html').on('change', reload);
});


gulp.task('watch', function() {
  gulp.watch('./src/scss/pages/*.scss', ['scss']);
  gulp.watch('./src/pug/*.pug', ['pug']);
});

gulp.task('default', function() {
  runSequence(
    'clean', ['scss', 'js','bfy', 'compress', 'pug']
  );
});

gulp.task('server', function() {
  runSequence(
    'clean', ['scss', 'js', 'bfy', 'pug', 'browsersync']
  );
});
