'use strict';

// Gulp file to automate the various tasks

const { src, series, parallel, dest, task, watch } = require('gulp');

let autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  cleanCss = require('gulp-clean-css'),
  postcss = require('gulp-postcss'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  wait = require('gulp-wait');

// Define paths

var paths = {
  src: {
    css: 'src/assets/css',
    js: 'src/assets/js',
    scss: 'src/assets/scss'
  }
}

// Compile SCSS

task('compile:scss', function (done) {
  return src(paths.src.scss + '/**/*.scss')
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.src.css));
  done();
});

// Minify CSS

task('minify:css', function (done) {
  return src(paths.src.css + '/darasa-www.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.src.css));
  done();
});

// Concat JS

task('concat:js', function (done) {
  return src([
    paths.src.js + '/license.js',
    paths.src.js + '/core/init/*.js',
    paths.src.js + '/core/custom/*.js',
    paths.src.js + '/core/maps/*.js',
    paths.src.js + '/core/libs/*.js',
    paths.src.js + '/core/charts/*js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('darasa-www.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.src.js));
  done();
});

// Minify js

task('minify:js', function (done) {
  return src(paths.src.js + '/darasa-www.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest(paths.src.js));
  done();
});

// Build

task('build', series('compile:scss', 'minify:css', 'concat:js', 'minify:js'));
