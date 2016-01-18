import gulp from 'gulp';
import runSequence from 'run-sequence';
import {reload} from 'browser-sync';
import watch from 'gulp-watch';

gulp.task('watch', () => {
	global.watch = true;

	watch('app/{styles,pages,layouts,blocks}/**/*.styl', () => runSequence('styles', () => reload('assets/styles/app.min.css')));
	watch(['app/{pages,layouts,blocks,data}/**/*.{jade,json}'], () => runSequence('templates', reload));
	watch('app/resources/**/*', () => runSequence('copy', reload));
	watch('app/icons/**/*.svg', () => runSequence('icons', reload));

	gulp.start('scripts:watch');
});
