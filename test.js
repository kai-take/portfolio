const { src, dest, watch, series, parallel } = require( "gulp" );
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const minifyCSS = require("gulp-clean-css");
const rename   = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss'); 
const autoprefixer = require('autoprefixer'); // まだ使用していない
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require("css-mqpacker");

const srcPath = {
    css: 'src/css/**.scss',
    js: 'src/js/*.js',
    img: 'src/img/**/*',
    html: './**/*.html',
}
const destPath = {
    css: 'dest/css/',
    js: 'dest/js/',
    img: 'dest/img/'
}

// 基本的には、returnのあと.pipe()でつなげて書いていけばいい
const imagemin = () => {
    src(srcPath.img)
    .pipe(imagemin([
        pngquant({
            quality: [0.65, 0.8],
            speed: 1
        }),
        mozjpeg({
            quality: 80
        }),
    ]))
    .pipe(rename({
        suffix: '_min'
    }))
    .pipe(dest('dest/img'));
}

const toSass = () => {
    return src('src/css/**/*.scss')
        .pipe(cssDeclarationSorter({order: 'smacss'}))
        .pipe(sass()) // cssにコンパイル
        .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
        .pipe(dest('dest/css/'))
        .pipe(minifyCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dest/css/'))
}

const minifyJs = () => {
    return src(srcPath.js)
    .pipe(uglify())
    .pipe(dest(destPath.js));
};    

//ローカルサーバー立ち上げ、ファイル監視と自動リロード
const browserSyncFunc = () => {
    browserSync.init(browserSyncOption);
}

const browserSyncOption = {
proxy: 'http://localhost/', //環境によって変更する
open: true,
reloadOnRestart: true,
}

//リロード
const browserSyncReload = (done) => {
browserSync.reload();
done();
}

 // 監視
const watchFiles = () => {
    watch(srcPath.css, series(toSass, browserSyncReload))
    watch(srcPath.js, series(minifyJs, browserSyncReload))
    watch(srcPath.img, series(imagemin, browserSyncReload))
    watch(srcPath.html, series(browserSyncReload))
 }

 exports.default = series( series( cssSass, jsBabel, imgImagemin ), parallel( watchFiles, browserSyncFunc ) );
