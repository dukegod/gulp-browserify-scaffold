var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var babel = require('gulp-babel');
var pug = require('gulp-pug');
var clean = require('gulp-clean');


gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('scss', function () {
  return sass('./src/scss/*.scss',{style: 'expanded'})
    .pipe(gulp.dest('dist/css'));
});

gulp.task('babel', function () {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('pug',function(){
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', ['scss']);
  gulp.watch('./src/js/*.js', ['babel']);
  gulp.watch('./src/pug/*.pug', ['pug']);
});

gulp.task('default', ['scss','babel','pug','watch'])

  

