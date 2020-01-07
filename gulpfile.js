var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsApp = ts.createProject('tsconfig.json');
var paths = {
    ejs: ['src/views/**/*'],
}

gulp.task('copy-views', function () {
    return gulp.src(paths.ejs)
        .pipe(gulp.dest('dist/views'));
});


gulp.task('default', gulp.series(gulp.parallel('copy-views'), function () {
    return tsApp.src().pipe(tsApp()).js.pipe(gulp.dest('dist'));
}));

gulp.task('watch', gulp.series('default', function () {
    return gulp.watch('src/**/*', gulp.series('default'));
}));