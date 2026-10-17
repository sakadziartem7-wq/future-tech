const { src, dest, watch, series, parallel } = require('gulp');
const fs = require('fs/promises');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');

/** Сборка со сжатием и без карт исходников. */
const isBuild = process.argv.includes('build');

const paths = {
  html: 'src/**/*.html',
  styles: 'src/scss/main.scss',
  stylesWatch: 'src/scss/**/*.scss',
  scripts: 'src/js/**/*.js',
  assets: ['src/assets/**/*', '!src/assets/**/.gitkeep'],
  dist: 'dist',
};

/**
 * Удаляет каталог сборки.
 * @returns {Promise<void>}
 */
function clean() {
  return fs.rm(paths.dist, { recursive: true, force: true });
}

/**
 * Копирует HTML в каталог сборки.
 * @returns {NodeJS.ReadWriteStream}
 */
function html() {
  return src(paths.html, { base: 'src' }).pipe(dest(paths.dist));
}

/**
 * Компилирует SCSS в CSS и добавляет вендорные префиксы.
 * @returns {NodeJS.ReadWriteStream}
 */
function styles() {
  const sassOptions = { style: isBuild ? 'compressed' : 'expanded' };
  let stream = src(paths.styles);

  if (!isBuild) {
    stream = stream.pipe(sourcemaps.init());
  }

  stream = stream
    .pipe(sass.sync(sassOptions).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]));

  if (!isBuild) {
    stream = stream.pipe(sourcemaps.write('.'));
  }

  return stream.pipe(dest(`${paths.dist}/css`)).pipe(browserSync.stream());
}

/**
 * Копирует скрипты в каталог сборки. В production минифицирует их.
 * @returns {NodeJS.ReadWriteStream}
 */
function scripts() {
  let stream = src(paths.scripts);

  if (isBuild) {
    stream = stream.pipe(terser());
  }

  return stream.pipe(dest(`${paths.dist}/js`));
}

/**
 * Копирует шрифты и изображения без перекодирования.
 * @returns {NodeJS.ReadWriteStream}
 */
function assets() {
  return src(paths.assets, { allowEmpty: true, encoding: false, base: 'src/assets' }).pipe(
    dest(`${paths.dist}/assets`),
  );
}

/**
 * Перезагружает открытые вкладки BrowserSync.
 * @param {Function} done
 */
function reload(done) {
  browserSync.reload();
  done();
}

/**
 * Поднимает локальный сервер и следит за исходниками.
 * @param {Function} done
 */
function serve(done) {
  browserSync.init(
    {
      server: paths.dist,
      port: 3000,
      notify: false,
      open: true,
    },
    done,
  );

  watch(paths.html, series(html, reload));
  watch(paths.stylesWatch, styles);
  watch(paths.scripts, series(scripts, reload));
  watch(paths.assets, series(assets, reload));
}

const compile = parallel(html, styles, scripts, assets);

exports.default = series(clean, compile, serve);
exports.build = series(clean, compile);
