var gulp = require('gulp');

var deploy = require("gulp-gh-pages");
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');


var paths = {
    scripts: 'scripts/**/*',
    stylesheets: 'stylesheets/**/*.less',

    images: 'images/**/*',
    html: '*.html',
    dist: 'dist'

};

gulp.task('clean', function (cb) {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean());
});

var distTasks = ['clean','image', 'usemin'];
gulp.task('deploy', distTasks, function () {
    return gulp.src(paths.dist + '/**/*')
        .pipe(deploy());
});

gulp.task('image', function () {
    return gulp.src(paths.images).pipe(imagemin()).pipe(gulp.dest(paths.dist + '/images'));
});


gulp.task('usemin', function () {
    return gulp.src(paths.html).pipe(usemin({
        css: [less(), 'concat', minifyCss(), rev()]
    })).pipe(gulp.dest(paths.dist));
});

gulp.task('watch', distTasks, function () {
    gulp.watch([paths.html, paths.stylesheets], ['usemin'])
});