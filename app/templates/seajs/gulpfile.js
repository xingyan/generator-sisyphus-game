/*global -$ */
'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

gulp.task('styles', function() {<% if(includeLess) { %>
  return gulp.src('src/styles/less/**/*.less')
    .pipe($.less({
      paths: [ path.join(__dirname, 'less', 'includes')]
    })) <% } else { %>
  return gulp.src('src/styles/css/**/*.css')<% } %>
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe(gulp.dest('.tmp/css'));
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('.tmp/img'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({
    searchPath: ['.tmp', 'node_modules/*', 'src/js']
  });

  return gulp.src('src/html/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});


gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['html', 'images'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});