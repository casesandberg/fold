import webpack from 'webpack'
import validate from 'webpack-validator'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

const port = process.env.PORT || 8517

export default validate(merge(baseConfig, {
  debug: true,
  devtool: 'eval',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${ port }/__webpack_hmr`,
    './src/index',
  ],

  output: {
    publicPath: `http://localhost:${ port }/dist/`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'NYLAS_APP_ID': JSON.stringify(process.env.NYLAS_APP_ID),
    }),
  ],
}))
