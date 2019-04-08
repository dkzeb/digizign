const gulp = require('gulp');
var del = require('del');
var vinylPaths = require('vinyl-paths');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean:dist', () => {
    return gulp.src('./dist/*')
        .pipe(vinylPaths(del))        
});

gulp.task('compile:src', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./dist'))
});

gulp.task('build', gulp.series('clean:dist', 'compile:src'));
