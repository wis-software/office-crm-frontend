const webpackMerge = require('webpack-merge');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const helpers = require('./helpers');

const ENV = 'production';

let commonConfig = require('./webpack.common.js');

module.exports = function() {

  return webpackMerge(commonConfig(), {

    devtool: 'source-map',

    plugins: [
      new PurifyPlugin(),

      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: helpers.getUglifyOptions(true)
      }),

      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        minRatio: 0.8,
        regExp: /\.css$|\.html$|\.js$|\.map|\.woff|\.woff2|\.ttf|\.eot$/,
        threshold: 2 * 1024
      }),
    ],

    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  })};

