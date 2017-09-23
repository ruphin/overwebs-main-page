'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var babel = require('gulp-babel');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var path = require('path');
var historyApiFallback = require('connect-history-api-fallback');

var SOURCE = 'src';
var source = function(...subpaths) {
  return subpaths.length == 0 ? SOURCE : path.join(SOURCE, ...subpaths);
};

// Watch files for changes & reload
gulp.task('serve', function() {
  browserSync({
    port: 5000,
    notify: false,
    open: false,
    logPrefix: 'APP',
    files: [source('*'), 'index.html'],
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    server: {
      baseDir: ['', 'node_modules'],
      middleware: [historyApiFallback()]
    }
  });

  gulp.watch(source('*'), browserSync.reload);
  gulp.watch('index.html', browserSync.reload);
});

// TODO: Prefix and minify the inlined CSS

// Build production files, the default task
gulp.task('default', function(cb) {
  gulp
    .src(source('*.js'))
    .pipe(babel({ presets: ['minify'] }))
    .pipe(gulp.dest('.'));
});
