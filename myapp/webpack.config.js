const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

module.exports = {
  entry: './app/scripts/index.js',
  // mode: 'production',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
    // ,publicPath: "http://localhost:8080/"
    // ,publicPath: 'dist/'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/iframes/start.html', to: './iframes/start.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/iframes/register.html', to: './iframes/register.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/iframes/login.html', to: './iframes/login.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/iframes/successful.html', to: './iframes/successful.html' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/styles/other.css', to: './styles/other.css' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/scripts/main.js', to: './scripts/main.js' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/scripts/jquery-3.3.1.min.js', to: './scripts/jquery-3.3.1.min.js' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/scripts/register.js', to: './scripts/register.js' }
    ]),
    new CopyWebpackPlugin([
      { from: './app/scripts/login.js', to: './scripts/login.js'}
    ]),
    new CopyWebpackPlugin([
      { from: './app/scripts/successful.js', to: './scripts/successful.js'}
    ]),
    new CopyWebpackPlugin([
      { from: './app/datas' , to: './datas'}
    ])
    ,
    new CopyWebpackPlugin([
      { from: './app/images' , to: './images'}
    ])
  ],
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.s?css$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-react-jsx', 'transform-object-rest-spread', 'transform-runtime']
        }
      },
      // {
      //   test: /\.jpg$/,
      //   loader: "url-loader?limit=10000&mimetype=image/jpg"
      // },
      // {
      //   test: /\.png$/,
      //   loader: "url-loader?limit=1000&mimetype=image/png"
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [ {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      },
      {
        test:/\.html$/,
        loader: "html-loader"
      }
    ]
  }
  // target: 'node'
  // ,node: {
  //   fs: "empty"
  // }
}

