var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps")
    browserSync = require("browser-sync").create();


var settings = {
    sass: {
        input: "scss/**/*.scss",
        output: "./css/"
    },
    html: {
        input: "./*.html"
    }
};

function reload() {
    browserSync.reload();
}
 
function style() {
    return (
        gulp
            .src(settings.sass.input)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(settings.sass.output))
            .pipe(browserSync.stream())
    );
}
 
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        } 
    });
    gulp.watch(settings.sass.input, style);
    gulp.watch(settings.html.input, reload);
}

exports.default = watch;