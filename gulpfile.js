import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from 'gulp-terser';
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
  return gulp.src('./style/resource/style.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('prof-trainers.css'))
    .pipe(gulp.dest('./style/modules/', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts() {
  return gulp.src('./js/common/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./js/modules/'))
    .pipe(browser.stream());
}

// export function optimizeImages() {
//   return gulp.src('./i/stat/img/**/*.{png,jpg}')
//     .pipe(gulpIf(!isDevelopment, squoosh()))
//     .pipe(gulp.dest('build/img'))
// }

// export function createWebp() {
//   return gulp.src('./i/stat/img/**/*.{png,jpg}')
//     .pipe(squoosh({
//       webp: {}
//     }))
//     .pipe(gulp.dest('build/img'))
// }

// export function optimizeVector() {
//   return gulp.src(['./i/stat/img/**/*.svg', '!./i/stat/img/icons/**/*.svg'])
//     .pipe(svgo())
//     .pipe(gulp.dest('build/img'));
// }

export function createStack() {
  return gulp.src('./i/stat/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./i/stat/'));
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
  gulp.watch('./js/common/**/*.js', gulp.series(processScripts));
  gulp.watch('./*.html', gulp.series(processMarkup, reloadServer));
}

function compileProject(done) {
  gulp.parallel(
    processMarkup,
    processStyles,
    processScripts,
    // optimizeVector,
    createStack,
    // copyAssets,
    // optimizeImages,
    // createWebp
  )(done);
}


export function buildProd(done) {
  isDevelopment = false;
  gulp.series(
    compileProject
  )(done);
}

export function runDev(done) {
  gulp.series(
    compileProject,
    startServer,
    watchFiles
  )(done);
}
