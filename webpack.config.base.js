import path from 'path'
import validate from 'webpack-validator'

export default validate({
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
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
