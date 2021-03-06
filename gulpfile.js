var gulp = require('gulp'),
settings = require('./settings'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins')

gulp.task('styles', function() {
  return gulp.src(settings.themeLocation + 'css/style.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest(settings.themeLocation));
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: false
  });

  gulp.watch('./**/*.php', function() {
    browserSync.reload();
  });
  gulp.watch(settings.themeLocation + 'css/**/*.css', gulp.series('waitForStyles'));
});

gulp.task('waitForStyles', gulp.series('styles', function() {
  return gulp.src(settings.themeLocation + 'style.css')
    .pipe(browserSync.stream());
}));
