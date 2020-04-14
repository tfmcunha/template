const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const NonJsEntryCleanupPlugin = require('./non-js-entry-cleanup-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { context, entry, devtool, outputFolder, publicFolder } = require('./config');
const HMR = require('./hmr');
const getPublicPath = require('./publicPath');

module.exports = (options) => {
  const { dev } = options;
  const hmr = HMR.getClient();
  return {
    mode: dev ? 'development' : 'production',
    devtool: dev ? devtool : false,
    context: path.resolve(context),
    entry: {
      'styles/admin': dev ? [hmr, entry.admin] : entry.admin,
      'styles/main': dev ? [hmr, entry.styles] : entry.styles,
      // 'styles/editor': dev ? [hmr, entry.editor] : entry.editor,
      'scripts/main': dev ? [hmr, entry.scripts] : entry.scripts
    },
    output: {
      path: path.resolve(outputFolder),
      publicPath: getPublicPath(publicFolder),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [...(dev ? [{ loader: 'cache-loader' }] : []), { loader: 'babel-loader' }]
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.scss$/,
          use: [
            ...(dev ? [{ loader: 'cache-loader' }, { loader: 'style-loader' }] : [MiniCssExtractWebpackPlugin.loader]),
            'css-loader', // translates CSS into CommonJS
            // 'resolve-url-loader',
            'sass-loader'
            // 'fast-sass-loader' // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico|mp4|webm)$/,
          use: [
            {
              loader: 'file-loader',
              // loader: 'ignore-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        bgset: 'lazysizes/plugins/bgset/ls.bgset.js',
        'object-fit-polyfill': 'lazysizes/plugins/object-fit/ls.object-fit.js',
        'respimg-polyfill': 'lazysizes/plugins/respimg/ls.respimg.js'
      }
    },
    plugins: [
      ...(dev
        ? [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()]
        : [
            new MiniCssExtractWebpackPlugin({
              filename: '[name].css'
            }),
            new NonJsEntryCleanupPlugin({
              context: 'styles',
              extension: 'js',
              includeSubfolders: true
            }),
            // new CopyWebpackPlugin([path.resolve(outputFolder)], {
            //   allowExternal: true,
            //   beforeEmit: true
            // }),
            new CopyWebpackPlugin(
              [
                {
                  from: path.resolve(`${context}/img/`),
                  to: path.resolve(`${outputFolder}/img/`)
                }
              ],
              // [
              //   {
              //     from: path.resolve(`${context}/fonts/*`),
              //     to: path.resolve(outputFolder)
              //   },
              //   {
              //     from: path.resolve(`${context}/img/*`),
              //     to: path.resolve(outputFolder)
              //   }
              // ],
              {
                ignore: ['*.js', '*.scss', '*.css']
              }
            )
          ])
    ]
  };
};
