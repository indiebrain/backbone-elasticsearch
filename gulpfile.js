const gulp = require('gulp');

gulp.task("default", ['lint','spec']);

var mochaPhantomJS = require('gulp-mocha-phantomjs');
gulp.task("spec", function() {
  return gulp
    .src("spec/index.html")
    .pipe(mochaPhantomJS());
});

var javascriptSourcesPath = "./lib/**/*.js";
var jshint = require('gulp-jshint');
gulp.task("lint", function() {
  return gulp
    .src(javascriptSourcesPath)
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

var closureCompiler = require('gulp-closure-compiler');
gulp.task("build", function() {
  var outputFileName = "backbone-elasticsearch.js";
  var compilerFlags = {
    compilation_level: 'WHITESPACE_ONLY'
  };
  return gulp
    .src(javascriptSourcesPath)
    .pipe(closureCompiler({
      compilerPath: 'node_modules/closure-compiler/lib/vendor/compiler.jar',
      fileName: outputFileName,
      compilerFlags: compilerFlags
    }))
    .pipe(gulp.dest('build'));
});
