var gulp = require('gulp');

var deploy = require("gulp-gh-pages");
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var del = require('del');

var paths = {
    scripts: 'scripts/**/*',
    stylesheets: 'stylesheets/**/*.less',

    images: 'images/**/*',
    html: '*.html',
    dist: 'dist'

};

gulp.task('clean', function (cb) {
    del(paths.dist + '/**/*', cb);
});

var distTasks = ['clean', 'image', 'usemin'];
gulp.task('deploy', distTasks, function () {
    gulp.src(paths.dist)
        .pipe(deploy());
});

gulp.task('image', function () {
    gulp.src(paths.images).pipe(imagemin()).pipe(gulp.dest(paths.dist + '/images'));
});


gulp.task('usemin', function () {
    gulp.src(paths.html).pipe(usemin({
        css: [less(), 'concat', minifyCss(), rev()]
    })).pipe(gulp.dest(paths.dist));
});

gulp.task('watch', distTasks, function () {
    gulp.watch([paths.html, paths.stylesheets], ['usemin'])
});