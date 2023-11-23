import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from 'gulp-terser';
import { deleteAsync } from 'del';
import webp from 'gulp-webp';
import webpack from 'webpack-stream';

// import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import rename from 'gulp-rename';
import { stacksvg } from "gulp-stacksvg";
import browser from 'browser-sync';

const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup() {
  return gulp.src('*.html')
}

export function processStyles() {
  return gulp.src('./style/resource/prof-trainers/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(gulp.dest('./style/modules/', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts() {
  return gulp.src('./js/common/prof-trainers/prof-trainers.js')
    .pipe(webpack({
      mode: 'none',
      module: {
        rules: [
          { test: /\.js$/i, exclude: '/node_modules/', use: ['babel-loader'] },
        ],
      },
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./js/modules/'))
    .pipe(browser.stream());
  }

// export function processScripts() {
//   return gulp.src('./js/common/**/*.js')
//     .pipe(terser())
//     .pipe(gulp.dest('./js/modules/'))
//     .pipe(browser.stream());
// }

// export function optimizeImages() {
//   return gulp.src('./i/stat/img/**/*.{png,jpg}')
//     .pipe(gulpIf(!isDevelopment, squoosh()))
//     .pipe(gulp.dest('build/img'))
// }

export function createWebp() {
  return gulp.src('./i/media-resource/**/*.{jpg,png}')
    .pipe(webp())
    .pipe(gulp.dest('./i/media/'))
}

// export function optimizeVector() {
//   return gulp.src(['./i/media-resource/**/*', '!./i/media-resource/stat/prof-trains/img/icons/**/*.svg'])
//     .pipe(svgo())
//     .pipe(gulp.dest('./i/media/'));
// }

export function createStack() {
  return gulp.src('./i/media-resource/stat/prof-trains/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./i/media/stat/prof-trains/img'));
}

export function copyAssets() {
  return gulp.src([
    './i/media-resource/**/*'
  ], { base: "i/media-resource" })
    .pipe(gulp.dest('./i/media'));
}

function deleteFolders() {
  return deleteAsync(['./i/media', './js/modules', './style/modules']);
}

export function startServer(done) {
  browser.init({
    server: {
      baseDir: './'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer(done) {
  browser.reload();
  done();
}

function watchFiles() {
  gulp.watch('./style/resource/**/*.scss', gulp.series(processStyles));
  gulp.watch('./i/media-resource/**/*.{jpg,png}', gulp.series(copyAssets, createWebp));
  gulp.watch('./js/common/**/*.js', gulp.series(processScripts));
  gulp.watch('./*.html', gulp.series(processMarkup, reloadServer));
}

function compileProject(done) {
  gulp.parallel(
    processMarkup,
    processStyles,
    processScripts,
    // optimizeVector,
    copyAssets,
    createStack,
    createWebp
    // optimizeImages,
  )(done);
}


export function buildProd(done) {
  isDevelopment = false;
  gulp.series(
    deleteFolders,
    compileProject
  )(done);
}

export function runDev(done) {
  gulp.series(
    deleteFolders,
    compileProject,
    startServer,
    watchFiles
  )(done);
}
