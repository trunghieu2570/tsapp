var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var tsApp = ts.createProject('tsconfig.json');
var paths = {
    ejs: ['src/views/**/*'],
}

gulp.task('copy-views', function () {
    return gulp.src(paths.ejs)
        .pipe(gulp.dest('dist/views'));
});


gulp.task('compile', gulp.series(gulp.parallel('copy-views'), function () {
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

gulp.task('default', gulp.parallel('watch', 'nodemon'));