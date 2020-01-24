var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var tsApp = ts.createProject('tsconfig.json');

var paths = {
    ejs: 'src/views/**/*',
    scss: 'src/sass/**/*.scss',
    webfonts: 'src/webfonts/**/*',
}


gulp.task('copy-views', function () {
    return gulp.src(paths.ejs)
        .pipe(gulp.dest('dist/views'));
});

gulp.task('copy-webfonts', function () {
    return gulp.src(paths.webfonts)
        .pipe(gulp.dest('dist/public/webfonts'));
});
gulp.task('sass', function() {
    return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('sass:watch', function() {
    return gulp.watch(paths.scss, gulp.series('sass'));
});

gulp.task('compile', gulp.series(gulp.parallel('copy-views'), gulp.parallel('copy-webfonts'), function () {
    return tsApp.src().pipe(tsApp()).js.pipe(gulp.dest('dist'));
}));

gulp.task('watch', gulp.series('compile', function () {
    return gulp.watch('src/**/*', gulp.series('compile'));
}));

gulp.task('nodemon', function () {
    return nodemon({
        script: 'dist/app.js',
    })
});

gulp.task('default', gulp.parallel('watch', 'nodemon', 'sass:watch'));