var gulp = require('gulp'),
	webpack = require('webpack'),
	gulp_sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	del = require('del'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(),
	mozjpeg = require('imagemin-mozjpeg'),
	optipng = require('imagemin-optipng'),
	imagemin = require('gulp-imagemin'),
	merge = require('merge-stream');

// …
var js = './src/**/*.js',
	distJs = './build/dist/js/**/*.js',
	sass = './src/**/*.scss';

function SASS() {
	return gulp
		.src(sass)
		.pipe(sourcemaps.init())
		.pipe(gulp_sass())
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(sourcemaps.write())
		.pipe(rename('custom.min.css'))
		.pipe(gulp.dest('./build/dist/css/'))
		.pipe(browserSync.stream());
}

function SASSBuild() {
	return gulp
		.src(sass)
		.pipe(gulp_sass())
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(autoprefixer('last 100 versions'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename('custom.min.css'))
		.pipe(gulp.dest('./build/dist/css/'))
		.pipe(browserSync.stream());
}

function cleanFiles() {
	return del(['./build/dist']);
}

function imageMinify() {
	return gulp
		.src('./build/assets/images/**/*')
		.pipe(imagemin([mozjpeg({ quality: 60, progressive: true }), optipng({ optimizationLevel: 5 })]))
		.pipe(gulp.dest('./build/dist/images/'));
}

function copyFiles() {
	return merge([
		gulp
			.src('./build/assets/images/**/*')
			.pipe(gulp.dest('./build/dist/images/')),
		gulp
			.src('./build/assets/fonts/**/*')
			.pipe(gulp.dest('./build/dist/fonts/')),
		gulp
			.src('./build/assets/svgs/**/*')
			.pipe(gulp.dest('./build/dist/svgs/'))
	]);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});

	gulp.watch(sass, SASS);
	gulp.watch(js, webpackScript);
	gulp.watch('./build/assets/images/*', copyFiles);
	gulp.watch('./build/assets/svgs/*', copyFiles);
	gulp.watch('./build/assets/fonts/*', copyFiles);
	gulp.watch(distJs).on('change', browserSync.reload);
	gulp.watch('**/*.html').on('change', browserSync.reload);
}

function webpackScript(callback) {
	webpack(require('./webpack.config.js'), function (err, stats) {
		if (err) {
			console.log(err.toString());
		} else {
			console.log(stats.toString());
		}
		callback();
	});
}

gulp.task('watch', watch);
gulp.task('webpackScript', webpackScript);
gulp.task('imgMinify', imageMinify);
gulp.task('production', gulp.series(cleanFiles, SASSBuild, copyFiles, imageMinify, webpackScript));
gulp.task('default', gulp.series(cleanFiles, SASS, copyFiles, webpackScript, watch));
