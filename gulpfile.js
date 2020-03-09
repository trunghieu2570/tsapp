var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var tsApp = ts.createProject('tsconfig.json');

var paths = {
    typescripts:
    ['src/controllers/**/*.ts',
     'src/model/**/*.ts',
     'src/app.ts',
     'src/server.ts'],
    views: ['src/views/**/*'],
    scss: ['src/sass/**/*.scss'],
    webfonts: ['src/webfonts/**/*'],
}

//copy views
gulp.task('copy:views', function () {
    return gulp.src(paths.views)
        .pipe(gulp.dest('dist/views'));
});

//compile sass
gulp.task('compile:sass', function() {
    return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/public/css'));
});

//compile typescript
gulp.task('compile:ts', function () {
    return tsApp.src().pipe(tsApp()).js.pipe(gulp.dest('dist'));
});


//watch sass
gulp.task('watch:sass', function() {
    return gulp.watch(paths.scss, gulp.series('compile:sass'));
});

gulp.task('watch:copy', function() {
    return gulp.watch(paths.views, gulp.series('copy:views'));
});

//watch typescript
gulp.task('watch:ts', function () {
    return gulp.watch(paths.typescripts, gulp.series('compile:ts'));
});

//monitoring
gulp.task('nodemon', function () {
    return nodemon({
        script: 'dist/app.js',
        watch: ['dist'],
    });
});

gulp.task('copy', gulp.parallel('copy:views'));

gulp.task('watch', gulp.parallel('watch:copy', 'watch:ts', 'watch:sass', 'nodemon'));

gulp.task('start', gulp.parallel('copy', 'compile:ts', 'compile:sass'));

//default task
gulp.task('default', gulp.series('start', 'watch'));