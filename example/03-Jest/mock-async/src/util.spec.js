/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 13:13:47
 * @LastEditTime: 2019-08-09 14:33:14
 * @LastEditors: linjy
 */
jest.mock('./http.js');
const { getUser } = require('./util'); 
// 同步
// test("应该打印一个用户信息", () => {
//   expect(printUser()).toBe('Jecyu (25 years old)')
// }) // 全局设定的方法

// 异步代码请求
test("应该打印一个用户信息", async () => {
  // getUser().then(text => {
  //   expect(text).toBe('Jecyu (25 years old)')
  // })
  const text = await getUser();
  expect(text).toBe('Jecyu (25 years old)');
}) // 全局设定的方法
