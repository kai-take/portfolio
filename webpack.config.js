const PATH = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');



module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: PATH.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    contentBase: `${__dirname}/dist`,
    port: 8080,
    open: true
   },
  module: {
    rules: [
      {
        test: /.(jpg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '../img/[name].[ext]',
          }
        }
      },
      
      {
        test: /\.scss$/i, // ローダーは定義した下から順番に読み込んでいく
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // javascriptとしてバンドルせず css として別ファイルに出力。
            // これでstyle-loaderは不要になる。sytle-loaderは、htmlのheadにstyleタグを差し込むための物
          },
          {
            loader: 'css-loader', // cssを読み込む。css内のurl()や@importをjsのrequireに変換する
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')(),
                  require('postcss-sort-media-queries')({
                    sort: 'desktop-first',
                  }),
                ]
            }}
          },
          {
            loader: 'sass-loader', // sass => css
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              }},
          },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: true,
    }),
    new StylelintPlugin({
      fix: true,
    }),
    new CopyPlugin(
      { 
        patterns: [
          { from: 'src/img', to: 'img' },
        ]
      }
    ),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-80'
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 1,
        colors: 256
      },
      svgo: {
      },
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true
        })
      ]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  // mode:puroductionでビルドした場合のファイル圧縮
  optimization: {
    minimizer: [new TerserJSPlugin({
      terserOptions: {
        compress: { drop_console: true }
      },
    }), new OptimizeCSSAssetsPlugin({})], // 圧縮は最後の工程
  },
}; 