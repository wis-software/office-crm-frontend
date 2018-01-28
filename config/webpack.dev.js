const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

const { dir } = require('./helpers');

const ENV = 'development';

let commonConfig = require('./webpack.common.js');

module.exports = function() {

  return webpackMerge(commonConfig(), {

    devtool: 'cheap-module-source-map',

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          ENV: JSON.stringify(ENV)
        }
      }),
      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/router',
            'rxjs',
            // 'ngx-cookie',
            // 'd3',
            // 'dragula',
            // '@swimlane/ngx-datatable',
            // 'jquery',
            // 'lodash',
            // 'moment'
          ]
        },
        dllDir: dir('dll'),
        webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      })
    ],

    devServer: {
      port: 8000,
      host: 'localhost',
      historyApiFallback: {
        index: '/',
        disableDotRule: true
      },
      watchOptions: {
        ignore: /node_modules/
      },
      proxy: {
        '/api/*': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        }
      }
    }

  })};

