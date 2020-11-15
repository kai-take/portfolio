const PATH = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: PATH.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
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
    ]
  },
  plugins: [
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
    }),], // 圧縮は最後の工程
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename] // 省略も出来るらしい
    }
  }
}; 