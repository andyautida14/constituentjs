var gulp = require('gulp');
var uglify = require('gulp-uglify');
var out = require('gulp-out');
var mocha = require('gulp-mocha');

gulp.task('compress', function () {
  return gulp.src("./constituent.js")
    .pipe(uglify())
    .pipe(out('./dist/{basename}.min{extension}'));
});

gulp.task('test', function() {
  return gulp.src("./test/*.js", {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
