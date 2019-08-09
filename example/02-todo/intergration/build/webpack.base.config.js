const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      }

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(resolve('src'), 'index.html'), // 把 js 注入到该文件下
      filename: 'index.html'
    })
  ]
};
