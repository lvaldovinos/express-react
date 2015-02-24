var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    react = require('gulp-react'),
    del = require('del'),
    bundler = browserify({
    entries : ['./client/linker.js'],
      debug : true
    });

gulp.task('clean' , function(cb) {
  del([
    './public/javascript/*.js'
  ] , cb);
});    
    
gulp.task('browserify' , function() {
  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/javascript/'));
});

gulp.task('concat-scripts' , function() {
  return gulp.src('./client/components/*.js')
    .pipe(concat('alonso-client.js'))
    .pipe(gulp.dest('./client/concat/'));
});

gulp.task('reactify' , function() {
  return gulp.src('./client/concat/alonso-client.js')
    .pipe(react())
    .pipe(gulp.dest('./public/javascript/'));
});



gulp.task('default' , ['clean' , 'browserify' , 'concat-scripts' , 'reactify']);
