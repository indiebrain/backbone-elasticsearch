const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task("spec", function() {
  return gulp
    .src("spec/**/*_spec.js")
    .pipe(mocha({ reporter: 'spec' }));
});
