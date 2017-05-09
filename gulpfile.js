var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');

var src = {
	scss: 'app/scss/*.scss',
	css: 'app/css',
	html: 'app/*.html',
  js: 'app/js/*.js'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: './app'
	});

	gulp.watch(src.scss, ['sass']);
  gulp.watch(src.js).on('change', reload);
	gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
	return gulp
		.src(src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: [
				'node_modules/susy/sass',
				'node_modules/font-awesome/scss',
				require('node-normalize-scss').includePaths
			]
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9']
		}))
		.pipe(uncss({
			html: [src.html]
		}))
		.pipe(gulp.dest(src.css))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('default', ['serve']);
