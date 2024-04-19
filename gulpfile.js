import gulp from 'gulp';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';
import webp from 'gulp-webp';
import webpack from 'webpack-stream';
import svgo from 'gulp-svgmin';
import rename from 'gulp-rename';
import { stacksvg } from 'gulp-stacksvg';
import browser from 'browser-sync';
import fileinclude from 'gulp-file-include';

const PROJECT_FOLDER = '.';
const SRC_FOLDER = '.';
const PUBLICATION_FOLDER = './build';

const path = {
  src: {
    html: `${SRC_FOLDER}/html/**/*.html`,
    css: `${SRC_FOLDER}/style/resource/*.scss`,
    img: `${SRC_FOLDER}/i/media-resource/**/*.{jpg,png}`,
    sprite: `${SRC_FOLDER}/i/media-resource/stat/icons/**/*.svg`,
    assets: `${SRC_FOLDER}/i/media-resource/**/*`
  },
  build: {
    html: `${PROJECT_FOLDER}/`,
    css: `${PROJECT_FOLDER}/style/modules/`,
    js: `${PROJECT_FOLDER}/js/modules/`,
    img: `${PROJECT_FOLDER}/i/media/`,
    sprite: `${PROJECT_FOLDER}/i/media/stat/`,
    assets: `${PROJECT_FOLDER}/i/media`
  },
  publication: {
    html: `${PUBLICATION_FOLDER}/`,
    css: `${PUBLICATION_FOLDER}/style/modules/`,
    js: `${PUBLICATION_FOLDER}/js/modules/`,
    img: `${PUBLICATION_FOLDER}/i/media/`,
    sprite: `${PUBLICATION_FOLDER}/i/media/stat/`,
    assets: `${PUBLICATION_FOLDER}/i/media`
  },
  watch: {
    html: `${SRC_FOLDER}/html/**/*.html`,
    css: `${SRC_FOLDER}/style/resource/**/*.scss`,
    js: `${SRC_FOLDER}/js/common/**/*.js`,
    json: `${SRC_FOLDER}/json/**/*.{json}`,
    assets: `${SRC_FOLDER}/i/media-resource/**/*.{jpg,png}`
  }
};

const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup() {
  return gulp.src(path.src.html)
    .pipe(fileinclude({
      prefix: '@@',

      context: {
        path: '/'
      }
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browser.stream());
}

export function processStyles() {
  return gulp.src(path.src.css, { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(gulp.dest(path.build.css, { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScript({ src, title, dest = path.build.js }) {
  return function script() {
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
  };
}

export function processAllScripts() {
  return gulp.series(
    processScript({ src: './js/common/prof-trainers.js', title: 'prof-trainers.js' }),
    processScript({ src: './js/common/delivery.js', title: 'delivery.js' }),
    processScript({ src: './js/common/msk-delivery.js', title: 'msk-delivery.js' }),
    processScript({ src: './js/common/region-delivery.js', title: 'region-delivery.js' }),
    processScript({ src: './js/common/cart.js', title: 'cart.js' }),
    processScript({ src: './js/common/assembly.js', title: 'assembly.js' }),
  );
}

export function optimizeImages() {
  return gulp.src('./i/media-resource/**/*.{png,jpg}')
    .pipe(gulp.dest('./i/media/'));
}

export function createWebp() {
  return gulp.src(path.src.img)
    .pipe(webp())
    .pipe(gulp.dest(path.build.img));
}

export function createStack() {
  return gulp.src(path.src.sprite)
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.build.sprite));
}


export function copyAssets() {
  return gulp.src(path.src.assets, { base: 'i/media-resource' })
    .pipe(gulp.dest(path.build.assets));
}

function deleteFolders() {
  return deleteAsync(['./*.html', path.build.assets, path.build.js, path.build.css]);
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
  gulp.watch(path.watch.css, gulp.series(processStyles));
  gulp.watch(path.watch.assets, gulp.series(copyAssets, createWebp));
  gulp.watch(path.watch.json, gulp.series(copyAssets));
  gulp.watch(path.watch.js, gulp.series(processAllScripts()));
  gulp.watch(path.watch.html, gulp.series(processMarkup, reloadServer));
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

//Publication

function deleteFoldersPub() {
  return deleteAsync([PUBLICATION_FOLDER]);
}

export function processMarkupPub() {
  return gulp.src(path.src.html)
    .pipe(fileinclude({
      context: {
        path: ''
      }
    }))
    .pipe(gulp.dest(path.publication.html))
    .pipe(browser.stream());
}

export function processStylesPub() {
  return gulp.src(path.src.css, { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(gulp.dest(path.publication.css, { sourcemaps: isDevelopment }));
}

export function processAllScriptsPub() {
  return gulp.series(
    processScript({ src: './js/common/prof-trainers.js', title: 'prof-trainers.js', dest: './build/js/modules/' }),
    processScript({ src: './js/common/delivery.js', title: 'delivery.js', dest: './build/js/modules/' }),
    processScript({ src: './js/common/msk-delivery.js', title: 'msk-delivery.js', dest: './build/js/modules/' }),
    processScript({ src: './js/common/region-delivery.js', title: 'region-delivery.js', dest: './build/js/modules/' }),
    processScript({ src: './js/common/cart.js', title: 'cart.js', dest: './build/js/modules/' }),
    processScript({ src: './js/common/assembly.js', title: 'cart.js', dest: './build/js/assembly/' }),
  );
}

export function copyAssetsPub() {
  return gulp.src([
    './i/media-resource/**/*',
  ], { base: 'i/media-resource' })
    .pipe(gulp.dest('./build/i/media'));
}

export function createStackPub() {
  return gulp.src(path.src.sprite)
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.publication.sprite));
}

export function createWebpPub() {
  return gulp.src(path.src.img)
    .pipe(webp())
    .pipe(gulp.dest(path.publication.img));
}

function compileProjectPub(done) {
  gulp.parallel(
    processMarkupPub,
    processStylesPub,
    processAllScriptsPub(),
    copyAssetsPub,
    createStackPub,
    createWebpPub
  )(done);
}

export function PubProd(done) {
  isDevelopment = false;

  gulp.series(
    deleteFoldersPub,
    compileProjectPub
  )(done);
}
