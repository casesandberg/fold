/* eslint-disable */

var webpack = require('webpack')
var validate = require('webpack-validator')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.base')

var port = process.env.PORT || 8517

module.exports = validate(merge(baseConfig, {
  debug: true,
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:' +  port + '/__webpack_hmr',
    './src/index',
  ],

  output: {
    publicPath: 'http://localhost:' + port + '/dist/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}))
