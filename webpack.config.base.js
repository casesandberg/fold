import path from 'path'
import validate from 'webpack-validator'

export default validate({
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, './fake.react-native.js'),
      'react-native-svg': path.resolve(__dirname, './fake.react-native-svg.js'),
      'react-universal': path.resolve(__dirname, './modules/react-universal/index.js'),
      'react-universal-auth': path.resolve(__dirname, './modules/react-universal-auth/index.js'),
    },
    extensions: ['', '.js'],
  },
})
