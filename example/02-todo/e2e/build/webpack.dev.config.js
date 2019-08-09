/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 01:42:43
 * @LastEditTime: 2019-08-09 14:22:57
 * @LastEditors: linjy
 */
const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // 开启服务器
    contentBase: '../dist',
    port: 9999
  },
  output: { // 输出
    filename: 'js/[name].[hash].js', // 输出名称
    path: path.resolve(__dirname, '../dist') // 输出目录
  },
  module: {}
})