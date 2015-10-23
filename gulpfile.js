var gulp = require('gulp');
var uglify = require('gulp-uglify');
var out = require('gulp-out');

gulp.task('compress', function () {
  return gulp.src("./constituent.js")
    .pipe(uglify())
    .pipe(out('./dist/{basename}.min{extension}'));
});
