import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';
import webp from 'gulp-webp';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import svgo from 'gulp-svgmin';
import rename from 'gulp-rename';
import { stacksvg } from 'gulp-stacksvg';
import browser from 'browser-sync';


const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup() {
  return gulp.src('*.html');
}

export function processStyles() {
  return gulp.src('./style/resource/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(gulp.dest('./style/modules/', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts({ src, title, dest = './js/modules/' }) {
  return gulp.src(src)
    .pipe(webpack({
      mode: 'none',
      module: {
        rules: [
          { test: /\.js$/i, exclude: '/node_modules/', use: ['babel-loader'] },
        ],
      },
    }))
    .pipe(rename(title))
    .pipe(gulp.dest(dest))
    .pipe(browser.stream());
}

export function processAllScripts() {
  return gulp.series(
    () => processScripts({ src: './js/common/prof-trainers.js', title: 'prof-trainers.js' }),
    () => processScripts({ src: './js/common/delivery.js', title: 'delivery.js' }),
    () => processScripts({ src: './js/common/msk-delivery.js', title: 'msk-delivery.js' }),
    () => processScripts({ src: './js/common/region-delivery.js', title: 'region-delivery.js' }),
    () => processScripts({ src: './js/common/region-delivery.js', title: 'cart.js' }),
  );
}

export function optimizeImages() {
  return gulp.src('./i/media-resource/**/*.{png,jpg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./i/media/'));
}

export function createWebp() {
  return gulp.src('./i/media-resource/**/*.{jpg,png,svg}')
    .pipe(webp())
    .pipe(gulp.dest('./i/media/'));
}

export function createStack() {
  return gulp.src('./i/media-resource/stat/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./i/media/stat/'));
}


export function copyAssets() {
  return gulp.src([
    './i/media-resource/**/*',
  ], { base: 'i/media-resource' })
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
  gulp.watch('./json/**/*.{json}', gulp.series(copyAssets));
  gulp.watch('./js/common/**/*.js', gulp.series(processAllScripts()));
  gulp.watch('./*.html', gulp.series(processMarkup, reloadServer));
}

function compileProject(done) {
  gulp.parallel(
    processMarkup,
    processStyles,
    processAllScripts(),
    copyAssets,
    createStack,
    createWebp
  )(done);
}


export function buildProd(done) {
  isDevelopment = false;
  gulp.series(
    deleteFolders,
    compileProject,
    optimizeImages
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
