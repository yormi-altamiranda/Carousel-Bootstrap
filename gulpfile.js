var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');
var pump = require('pump');
var gulpPugBeautify = require('gulp-pug-beautify');
var bs = require('browser-sync').create();
var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    lightbox2: 'bower_components/lightbox2/dist/css/lighbox.css',
    publicDir: './dist',
    sassPath: './assets/scss/**/*.scss',
    pugPath : './assets/**/*.pug',

    // sassPath: './dist/css',
};
var paths = {
    javascript: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './assets/js/*.js',
    ],
    alljs: [
        './dist/js/*.js'
    ],
    css: [
        './dist/css/*.css'
    ]
};
// Task PUG
gulp.task('pug', function() {
    pump([
        gulp.src(config.pugPath),
        pug({
            pretty: true
        }),
        gulpPugBeautify({ omit_empty: true, omit_div: false, fill_tab: true, omit_empty_lines: true, tab_size: false }),
        gulp.dest('./dist')
    ])
});

// Tarea SASS
gulp.task('sass', function(x) {
    pump([
        gulp.src(config.sassPath),
        sass({
            // Bootstrap para la produccion
            includePaths: [config.bootstrapDir + '/assets/stylesheets'],
        }).on('error', sass.logError),
        autoprefixer({ browsers: ['last 2 versions'], cascade: false }),
        cleanCSS(),
        rename({ suffix: ".min", }),
        gulp.dest(config.publicDir + '/css'),
        bs.stream()
    ], x);
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
        .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('watch', function() {
    bs.init({
        server: "./dist"
    })
    gulp.watch('assets/*.pug', ['pug']);
    gulp.watch(config.sassPath, ['sass']).on('change', bs.stream);
    gulp.watch("assets/js/*.js", ['compress']).on('change', bs.reload);
    gulp.watch("dist/*.html").on('change', bs.reload);
});
// Compreson JS
gulp.task('compress', function() {
    gulp.src(paths.javascript)
        .pipe(concat('dist/js/all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min", }))
        .pipe(gulp.dest('./'));
});
gulp.task('default', ['pug', 'sass', 'compress', 'fonts', 'watch']);