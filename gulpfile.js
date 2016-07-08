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

var jsFiles = [
    'apps/todos/public/js/models/*.js',
    'apps/todos/public/js/controller.js'
];

gulp.task('default', function() {
    return gulp.src(jsFiles)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    return gulp.watch('apps/todos/public/js/**/*.js', ['default']);
});
