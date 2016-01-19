import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import prettify from 'gulp-html-prettify';
import errorHandler from 'gulp-plumber-error-handler';
import getData from 'jade-get-data';
import path from 'path';

const config = {
	basedir: 'app',
	data: {
		getData: getData('app/data'),
		getPages: getData('app/pages'),
		getBlock: getData('app/blocks'),
		jv0: 'javascript:void(0);',
		timestamp: Date.now()
	}
};
gulp.task('templates', () => (
	gulp.src(['app/pages/**/*.jade', '!app/pages/*/sections/*.jade'])
		.pipe(plumber({errorHandler: errorHandler('Error in \'templates\' task')}))
		//.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(jade(config))
		.pipe(prettify({
			brace_style: 'expand',
			indent_size: 1,
			indent_char: '\t',
			indent_inner_html: true,
			preserve_newlines: true
		}))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist'))
));

gulp.task('sections', () => (
	gulp.src('app/pages/*/sections/*.jade')
		.pipe(plumber({errorHandler: errorHandler('Error in \'templates\' task')}))
		.pipe(cached('jade'))
		.pipe(gulpif(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(jade(config))
		.pipe(prettify({
			brace_style: 'expand',
			indent_size: 1,
			indent_char: '\t',
			indent_inner_html: true,
			preserve_newlines: true
		}))
		.pipe(rename(function(filepath){
			filepath.dirname = 'sections\\' + path.dirname(filepath.dirname);
		}))
		.pipe(gulp.dest('dist'))
));
