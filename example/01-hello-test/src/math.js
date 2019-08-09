/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 13:34:42
 * @LastEditTime: 2019-08-09 14:05:33
 * @LastEditors: linjy
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

module.exports =  {
  sum,
  mul,
  sub,
  div
}