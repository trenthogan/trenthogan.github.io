var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

//Minify Css
gulp.task('minify-css', function() {

  gulp.src('./css/main.css')
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./css/'))
    
});

//Uglify Js
gulp.task('compress-js', function() {
  gulp.src(['./components/classie/classie.js', './js/script.js'])
    .pipe(concat('script-concat.js'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('./js/'))
    
});

//JS Hint
gulp.task('lint', function() {
  gulp.src('./js/script.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//Default Gulp Task
gulp.task('default', ['minify-css', 'compress-js']);