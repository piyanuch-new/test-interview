const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
 
sass.compiler = require('node-sass');

// scss //
gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});
// js //
gulp.task('script', function () {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});
// html //
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    open: true
  });
});

gulp.task('watch', function () {
  gulp.watch('./src/css/*.scss', gulp.series('sass'));
  gulp.watch('./src/js/*.js', gulp.series('script'));
  gulp.watch('./src/*.html', gulp.series('html'));
});

gulp.task('default', gulp.parallel('webserver', 'watch'));