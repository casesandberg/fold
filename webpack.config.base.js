/* eslint-disable */

var path = require('path')
var validate = require('webpack-validator')

module.exports = validate({
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: [
          'es2015',
          'stage-0',
          'react'
        ],
        env: {
          development: {
            presets: ['react-hmre']
          },
        }
      }
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js'],
  },
})
