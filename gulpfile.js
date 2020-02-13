const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');
// const cache = require('gulp-cache');

const distFolder = 'dist';

gulp.task('sass', function () {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass', 'reload'));
    gulp.watch('src/**/*.{html,js,css}', gulp.series('reload'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: './src'
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', gulp.parallel('serve', 'watch'));

// build

gulp.task('clean:dist', function(done) {
    del.sync(distFolder);
    done();
});

gulp.task('useref', function (done) {
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulpif('*.html', htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest(distFolder))
    done();
})

gulp.task('fonts', function(done) {
    gulp.src(`src/**/**/*.+(ttf|woff|woff2|eot|svg)`)
        .pipe(flatten())
        .pipe(gulp.dest(`${distFolder}/fonts`))
    done();
});

gulp.task('images', function(done) {
    gulp.src(`src/**/**/*.+(png|jpg|gif|svg)`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${distFolder}`))
    done();
});


gulp.task('serve:dist', function (done) {
    browserSync.init({
        server: distFolder
    });
    done();
});

gulp.task('build', 
    gulp.series('clean:dist', gulp.parallel(
        'useref',
        'fonts',
        'images'
    ))
);
