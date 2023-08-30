const { src, dest, series, parallel, watch } = require('gulp');
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCss = require('gulp-clean-css');
// const rename = require('gulp-rename');
// const browserify = require('gulp-browserify');
// const babelify = require('babelify');
// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');

function html() {
return src(['src/**/*.html', '!src/components/**/*.html'])
    .pipe(fileinclude())
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

function css() {
    return src(['src/**/*.css'])
        // .pipe(sass())
        // .pipe(rename('main.css'))
        // .pipe(cleanCss())
        // .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function js() {
    return src(['src/lib/**/*.js'])
        .pipe(fileinclude())
        .pipe(dest('build/lib'))
        .pipe(browserSync.stream());
}

function tscript() {
    return src(['src/i18n/*.ts', 'src/components/**/*.ts', 'src/main.ts'])
        .pipe(concat('index.ts'))
        // .pipe(browserify({ transform: [babelify.configure({ presets: ['@babel/preset-env'] })] }))
        // .pipe(uglify({
        //     toplevel: true
        // }))
        // .pipe(rename({
        //     dirname: ".",
        //     basename: "index",
        //     extname: ".ts"
        // }))
        .pipe(ts({
            noImplicitAny: false,
            target: "ES2019",
            outFile: 'index.js',
            moduleResolution: "node"
        }))
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function images() {
    return src(['src/**/*.jpeg', 'src/**/*.jpg', 'src/**/*.png', 'src/**/*.svg', 'src/**/*.webp'])
        // .pipe(imagemin())
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}

function fonts() {
    return src(['src/assets/fonts/**/*'])
        .pipe(dest('build/assets/fonts'))
        .pipe(browserSync.stream());
}

function clean(){
    return del(['./build/*']);
}

function cleanDist(){
    return del(['./build/components']);
}

function dev(){
    browserSync.init({
        server: './build'
    });
    watch('src/**/*.html', html);
    watch('src/**/*.css', css);
    watch('src/**/*.ts', tscript);
    watch('src/assets/**/*', images);
}
function build(){
    return series(clean, parallel(tscript, js, css), fonts, images, html);
}

exports.build = build();
exports.dev = series(clean, build(), dev);