// gulpプラグインの読み込み
const gulp = require("gulp");

// 画像を圧縮するプラグインの読み込み
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");

// srcImgフォルダのjpg,png画像を圧縮して、distImgフォルダに保存する
gulp.task("imagemin", function() {
  return gulp
    .src("img/*.{png,jpg}") // srcImgフォルダ以下のpng,jpg画像を取得する
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
    .pipe(gulp.dest("img/min")); //保存
});