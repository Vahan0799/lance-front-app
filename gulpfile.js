var gulp = require('gulp'),
	webpack = require('webpack'),
	gulp_sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	del = require('del'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create();

// …
var js = './src/**/*.js',
	distJs = './dist/js/**/*.js',
	sass = './src/**/*.scss';

function SASS() {
	return gulp
		.src(sass)
		.pipe(sourcemaps.init())
		.pipe(gulp_sass())
		.on('error', function(err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(sourcemaps.write())
		.pipe(rename('custom.min.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.stream());
}

function SASSBuild() {
	return gulp
		.src(sass)
		.pipe(gulp_sass())
		.on('error', function(err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(autoprefixer('last 100 versions'))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename('custom.min.css'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.stream());
}

function cleanFiles() {
	return del(['./dist']);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});

	gulp.watch(sass, SASS);
	gulp.watch(js, webpackScript);
	gulp.watch('./src/assets/images/*');
	gulp.watch('./src/assets/svgs/*');
	gulp.watch('./src/assets/fonts/*');
	gulp.watch(distJs).on('change', browserSync.reload);
	gulp.watch('**/*.html').on('change', browserSync.reload);
}

function webpackScript(callback) {
	webpack(require('./webpack.config.js'), function(err, stats) {
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
gulp.task('production', gulp.series(cleanFiles, SASSBuild, webpackScript));
gulp.task('default', gulp.series(cleanFiles, SASS, webpackScript, watch));