var gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  replace = require('gulp-replace'),
  useref = require('gulp-useref'),
  data = require('gulp-data'),
  twig = require('gulp-twig');

var browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
var jquery = require('gulp-jquery');

var html = {
  source: 'src',
  target: 'dist'
}

var css = {
  source: 'src/css',
  target: 'dist/css'
};
var scss = {
  source: 'src/css',
  target: 'src/css/output'
};

var js = {
  source: 'src/js',
  target: 'dist/js'
};

gulp.task('html', function () {
  gulp.src([
      html.source + '/**/*.html'
    ])
    .pipe(useref({
      noAssets: true
    }))
    .pipe(gulp.dest(html.target));
});

gulp.task('jquery', function () {
	return gulp.src('./node_modules/jquery-custom/jquery.1/src')
		.pipe(jquery())
		.pipe(gulp.dest(js.source));
});

gulp.task('twig', function () {
  gulp.src([
      html.source + '/index.twig'
    ])
    .pipe(data(function (file) {
      return require('./src/index-data.json');
    }))
    .pipe(twig())
    .pipe(gulp.dest(html.target));
});

gulp.task('css', function () {
  gulp.src([
      css.source + '/**/*.css'
    ])
    .pipe(minifycss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(css.target));
});

gulp.task('scss', function () {
  gulp.src([
      scss.source + '/**/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(concat('all_scss.min.css'))
    .pipe(gulp.dest(scss.target));
});

gulp.task('scss:watch', function () {
  gulp.watch(
    css.source + '/**/*.scss', ['scss']);
});

gulp.task('js', function () {
  gulp.src([
      js.source + '/**/*.js'
    ])
    .pipe(uglify({
      mangle: true
    }).on('error', gutil.log))
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(js.target));
});

gulp.task('default', ['html',  'js', 'scss', 'css', 'jquery']);

gulp.task('watch', function () {
  watchFiles();
});

function watchFiles() {
  gulp.watch(html.source + '/**/*.html', ['html']);
  gulp.watch(css.source + '/**/*.css', ['css']);
  gulp.watch(scss.source + '/**/*.scss', ['scss']);
  gulp.watch(js.source + '/**/*.js', ['js']);
}

gulp.task('serve', function () {

  browserSync.init({
    server: "./dist",
    index: "index.html"
  });

  watchFiles();
  gulp.watch(["dist/**/*.html", "dist/**/*.css", "dist/**/*.js"]).on('change', browserSync.reload);
});