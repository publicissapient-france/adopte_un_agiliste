var gulp = require('gulp');

var deploy = require("gulp-gh-pages");
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var declare = require('gulp-declare');

var paths = {
    scripts: 'scripts/**/*',
    font: 'font/**/*',
    stylesheets: 'stylesheets/**/*.less',
    templates: 'templates/**/*',
    images: 'images/**/*',
    html: '*.html',
    dist: 'dist'

};

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean());
});

var distTasks = ['clean', 'image', 'usemin', 'resources'];
gulp.task('deploy', distTasks, function () {
    return gulp.src(paths.dist + '/**/*')
        .pipe(deploy());
});

gulp.task('image', function () {
    return gulp.src(paths.images).pipe(imagemin()).pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('resources', function () {
    gulp.src(['CNAME', 'robots.txt', 'sitemap.xml', 'favicon.ico']).pipe(gulp.dest(paths.dist));
    gulp.src(paths.font).pipe(gulp.dest(paths.dist + '/font'));
});


gulp.task('usemin', function () {
    return gulp.src(paths.html).pipe(usemin({
        css: [less(), 'concat', minifyCss(), rev()],
        js: ['concat', uglify(), rev()],
        hbar: [handlebars(), defineModule('plain'), declare({namespace: 'TEMPLATES'}), 'concat', uglify(), rev()]
    })).pipe(gulp.dest(paths.dist));
});

gulp.task('watch', distTasks, function () {
    gulp.watch([paths.html, paths.templates, paths.stylesheets, paths.scripts], ['usemin'])
    gulp.watch([paths.images], ['image'])
});