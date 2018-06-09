var gulp = require('gulp');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var pump = require('pump');

var clientMasks = [
  'build/*/client/*.module.js',
  'build/*/client/controllers/*.js',
  'build/*/client/services/*.js',
  'build/*/client/directives/*.js',
  'build/*/client/routes/*.js',
  'build/*/client/index.js'
];

gulp.task('js', function (cb) {
  // put all angular modules, services, controllers, directives and routes into public/js/app.js
  pump([
    gulp.src(clientMasks),
    wrap('// BEGIN <%= file.relative %>\n<%= contents %>\n// END <%= file.relative %>\n\n'),
    concat('app.js'),
    gulp.dest('public/js')
  ], cb);
});

gulp.task('build', ['js']);

gulp.task('watch', ['build'], function () {
  gulp.watch(clientMasks, ['build']);
});
