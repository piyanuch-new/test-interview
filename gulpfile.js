const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/css/*.scss', ['sass']);
});

const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

// Gulp 4 uses exported objects as its tasks. Here we only have a
// single export that represents the default gulp task.
exports.default = function(done) {
  // This will grab any file within src/components or its
  // subdirectories, then ...
  return src('src/js/*.js')
    // Stop the process if an error is thrown.
    .pipe(plumber())
    // Transpile the JS code using Babel's preset-env.
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    // Save each component as a separate file in dist.
    .pipe(dest('dist/js'))
};