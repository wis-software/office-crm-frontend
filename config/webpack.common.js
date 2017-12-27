const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const helpers = require('./helpers');

const ngcWebpackSetup = helpers.ngcWebpackSetup;
const METADATA = helpers.METADATA;
const path = require('path');

// Helper functions
const ROOT = process.cwd();

module.exports = function() {
  const ngcWebpackConfig = ngcWebpackSetup(METADATA.isProd, METADATA.AOT);

  Object.assign(ngcWebpackConfig.plugin, {
    tsConfigPath: METADATA.tsConfigPath,
    mainPath: './src/main.ts'
  });

  return {
    context: path.join(ROOT, 'src'), // TODO

    entry: {
      polyfills: './polyfills.ts',
      main: './main.ts'
    },

    output: {
      path: path.join(ROOT, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js',
      hotUpdateChunkFilename: "[id].[hash].hot-update.js",
      publicPath: '/'
    },

    resolve: {
      mainFields: [ 'es2015', 'browser', 'module', 'main' ],
      extensions: ['.ts', '.js', '.scss'],
      modules: ['node_modules']
    },

    module: {
      rules: [
        ...ngcWebpackConfig.loaders,
        // {
        //   enforce: 'pre',
        //   test: /\.ts$/,
        //   loader: 'string-replace-loader',
        //   query: {
        //     search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
        //     replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
        //     flags: 'g'
        //   }
        // },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          query: {
            name: 'assets/fonts/[name].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          query: {
            name: 'assets/images/[name].[ext]'
          }
        },
        {
          test: /\.css$/,
          exclude: [/node_modules/, /\/app\//],
          // loader: ExtractTextPlugin.extract('style', 'css', 'autoprefixer-loader?browsers=last 2 versions')
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.css$/,
          include: /\/app\//,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: 'styles/[2].[hash].[ext]',
                regExp: 'src/(.*)/app/(.*).css'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                  ];
                },
                sourceMap: true
              }
            }
          ]
        },
        //FIXME Hot fix
        // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/417
        // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/50
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.scss$/, // Only .scss files
          include: /\/app\//,
          use: [
            { loader: 'to-string-loader', options: { sourceMap: true } },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]
        },
        {
          test: /\.scss$/, // Only .scss files
          exclude: [/node_modules/, /\/app\//],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'resolve-url-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } }
            ]
          })
        },
        {
          test: /\.json$/,
          loader: 'file-loader',
          query: {
            name: 'json/[2].json',
            regExp: 'src/(.*)/app/(.*).json'
          }
        },
        {
          test: /\.html$/,
          use: 'raw-loader'
        }
      ],
    },

    devtool: 'inline-source-map',

    plugins: [
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
      ]),

      new ExtractTextPlugin({
        filename: 'styles/[name].[hash].css',
        allChunks: true
      }),

      new CleanWebpackPlugin(['dist'], {
        root: ROOT,
        verbose: true,
        dry: false
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunksSortMode: 'dependency',
      }),

      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),

      /**
       * This enables tree shaking of the vendor modules
       */
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),

      /**
       * Specify the correct order the scripts will be injected in
       */
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      new CommonsChunkPlugin({
        name: ['manifest'],
        minChunks: Infinity,
      }),

      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core/,
        __dirname,
        {} // a map of your routes
      ),

      new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru|en-gb/),

      new ngcWebpack.NgcWebpackPlugin(ngcWebpackConfig.plugin),
]

}};
