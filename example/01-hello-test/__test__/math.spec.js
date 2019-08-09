/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 13:34:42
 * @LastEditTime: 2019-08-09 14:06:04
 * @LastEditors: linjy
 */
const { sum, mul, sub, div } = require('../src/math');

describe('test math function', () => {
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
    // expect(sum('1', '1')).toBe(2); // 参数类型，边界情况
    expect(sum('1', '1')).toBe(null); // 输入非数字返回 null
  })
  // it('Multiplying 1 * 1 equals 1', () => {
  //   expect(mul(1, 1)).toBe(1)
  // })
  // it('Subtracting 1 - 1 equals 1', () => {
  //   expect(sub(1, 1)).toBe(0)
  // })
  // it('Divding 1 / 1 equals 1', () => {
  //   expect(div(1, 1)).toBe(1)
  // })
})
