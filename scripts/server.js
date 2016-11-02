/* eslint-disable */

var express = require('express')
var webpack = require('webpack')
var path = require('path')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var config = require('../webpack.config.development')

const app = express()
const compiler = webpack(config)
const PORT = process.env.PORT || 8517

const middleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.use(express.static('src'))
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../src', 'index.html'))
})


app.listen(PORT, 'localhost', function (err) {
  if (err) { console.error(err); return }
  console.log(`Listening at http://localhost:${ PORT }`)
})
