var gulp 	= require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('test-lint', function(){
	return gulp.src('apps/todos/public/js/**/*.js')
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failOnError());
});

gulp.task('test-lint-watch', function(){
	return gulp.watch('apps/todos/public/js/**/*.js', ['test-lint']);
});
