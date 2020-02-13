/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 13:34:42
 * @LastEditTime : 2020-02-13 15:20:53
 * @LastEditors  : linjy
 */
const sum = function(a, b) {
  if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
    return null;
  }
  return a + b;
};
const mul = (a, b) => a * b;
const sub = (a, b) => a - b;
const div = (a, b) => a / b;

module.exports =  { // node 环境下
  sum,
  mul,
  sub,
  div
}