'use strict';
// All packages
var gulp        = require('gulp');
var compass     = require('gulp-compass'),
    watch       = require('gulp-watch'),
    rename      = require('gulp-rename'),
    clean       = require('gulp-clean'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    imagemin    = require('gulp-imagemin'),
    jpegtran    = require('imagemin-jpegtran'),
    pngquant    = require('imagemin-pngquant'),
    batch       = require('gulp-batch'),
    plumber     = require('gulp-plumber'),
    livereload  = require('gulp-livereload'),
    notify      = require('gulp-notify');

var onError = function(err) {
    console.log(err);
    err.end();
}

gulp.task('default', function() {
  // place code for your default task here
});

// Watch dev task
gulp.task('watch', function () {
      gulp.start('compass');
      livereload.listen("localhost:8888");
      livereload();
      gulp.watch('./front/**/*.scss', function(){
        gulp.start('compass');
    });
});

// Scss compilation
gulp.task('compass', function() {
  return gulp.src('./front/scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      css: './static/css',
      sass: './front/scss',
      image: './static/images'
    }))
    .pipe(gulp.dest('./static/css'))
    .pipe(notify({ message: 'Compass task complete' }))
    .pipe(livereload());
});

// clean scripts
gulp.task('clean-scripts', function () {
  return gulp.src('./static/js/*min.js', {read: false})
  .pipe(clean());
});

// Optimize imgs & copy them from front to static
gulp.task('optim-imgs', function () {
  gulp.src('./front/images/**/')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant(),jpegtran()]
  }))
  .pipe(gulp.dest('./static/images/'));
});

// Deploy task
// Minify CSS & write .min.css
// Minify JS & write .min.js
gulp.task('deploy', ['clean-scripts'], function() {
  // Minify CSS
  gulp.src('./static/css/*.css')
  .pipe(minifyCSS())
  .pipe(gulp.dest('./static/css')); 
  // Minify JS
  gulp.src('./static/js/*.js')
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += '.min';
  }))
  .pipe(gulp.dest('./static/js'));
});
