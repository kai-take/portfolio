// gulpプラグインの読み込み
const gulp = require("gulp");

// 画像を圧縮するプラグインの読み込み
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const cleanCSS = require("gulp-clean-css");
const rename   = require("gulp-rename");
const uglify = require("gulp-uglify");
const htmlmin = require('gulp-htmlmin');

// srcImgフォルダのjpg,png画像を圧縮して、distImgフォルダに保存する
gulp.task("imagemin", function() {
  return gulp
    .src("src/img/*.{png,jpg,jpeg}") // srcImgフォルダ以下のpng,jpg画像を取得する
    .pipe(
      imagemin([
        pngquant({
          quality: [.7, .85], // 画質
          speed: 1 // スピード
        }),
        mozjpeg({
          quality: 85, // 画質
          progressive: true
        })
      ])
    )
    .pipe(gulp.dest("dest/img")); //保存
});

// cssの圧縮&rename
gulp.task('css-minify', function(done) {
    gulp.src("src/css/*.css")
        .pipe(cleanCSS())   
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dest/css'));
    done();
});

// jsの圧縮&rename
gulp.task('js-minify', function(done) {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dest/js'));
    done();
});

// htmlの圧縮&rename
gulp.task('html-minify', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
        // 余白を除去する
        collapseWhitespace : true,
        // HTMLコメントを除去する
        removeComments : true
    }))
    .pipe(gulp.dest('html'))
})

// 監視ファイル
gulp.task('watch-files', function(done) {
    gulp.watch("src/css/*.css", gulp.task('css-minify'));
    gulp.watch("src/js/*.js", gulp.task('js-minify'));
    gulp.watch("src/img/*.{png,jpg}", gulp.task('imagemin'));
    done();
});

gulp.task('default', gulp.series('watch-files', function(done){
    done();
}));