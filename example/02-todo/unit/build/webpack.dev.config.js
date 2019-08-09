/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 21:20:53
 * @LastEditTime: 2019-08-09 00:35:19
 * @LastEditors: Please set LastEditors
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