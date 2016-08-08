const gulp = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task("spec", function() {
  return gulp
    .src("spec/index.html")
    .pipe(mochaPhantomJS());
});
