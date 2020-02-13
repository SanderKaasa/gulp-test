const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


function css() {
    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('css'))
        .pipe(browserSync.stream())
}


function minifyImg() {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images/minified'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('sass/**/*.scss', css);
    gulp.watch('images/*',minifyImg);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.watch = watch;