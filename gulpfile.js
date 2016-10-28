var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  "vhost"         : "themename.dev",
  "themes"        : "www/wordpress/wp-content/themes/themename/*.php",
  "themesErement" : "www/wordpress/wp-content/themes/themename/**/*.php",
  "sassDir"       : "www/wordpress/wp-content/themes/themename/sass/**/*.scss",
  "sass"          : "www/wordpress/wp-content/themes/themename/sass/style.scss",
  "style"         : "www/wordpress/wp-content/themes/themename/"
}

gulp.task('bs-init', function() {
  browserSync({
    proxy: paths.vhost,
  });
});
 
gulp.task('bs-reload', function() {
  browserSync.reload()
});
 
gulp.task('styles', function() {
  gulp.src([paths.sass])
    .pipe(sass())
    .pipe(autoprefixer({
            // ☆IEは9以上、Androidは4以上、iOS Safariは8以上
            // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
            browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
            cascade: false
        }))
    //.pipe(cssmin())
    .pipe(gulp.dest(paths.style))
});
 
gulp.task('watch', function() {
  gulp.watch([paths.themes], ['bs-reload']);
  gulp.watch([paths.themesErement], ['bs-reload']);
  gulp.watch([paths.sassDir], ['styles','bs-reload']);
});
 
gulp.task('default', ['bs-init', 'bs-reload', 'watch']);