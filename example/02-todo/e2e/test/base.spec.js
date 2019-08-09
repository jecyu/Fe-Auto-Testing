/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 01:42:43
 * @LastEditTime: 2019-08-09 14:24:42
 * @LastEditors: linjy
 */
// 引入 puppeteer
const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('../utils/base'); // 引入这个文件，这里也可以用 import 需要配置下 babel，花更多时间在测试傻姑娘
// 第一个参数写测试的功能组描述 
// 第二个参数，添加测试代码
test('应该输出 name 和 age', () => {
  const text = generateText('Jecyu', 25);  // 对比手动测试，需要到浏览器点击
  expect(text).toBe('Jecyu (25 years old)') // 清晰的成功输出 如果出错，会指出具体的出错信息 你可以添加 --watch 参数
})


test('应该输出一个有效的文本', () => {
  const text = checkAndGenerate('Jecyu', 25); // 这个函数集成了两个函数
  expect(text).toBe('Jecyu (25 years old)');
})

beforeEach(() => {
  jest.setTimeout(10000); // 设置 jest 测试超时时间
}) 
test('应该输入 name 和 age，输出 指定文本', async() => {   
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,  // 可以让我们观察到操作
    // args: ['--window-size=1920, 1080']
  })
  // 按照指定路径进行测试
  const page = await browser.newPage();
  await page.goto('http://localhost:9999/');
  await page.click('input#name'); 
  await page.type('input#name', 'Jecyu'); // 输入
  await page.click('input#age'); 
  await page.type('input#age', '25'); // 输入，这里要输入字符串形式 https://github.com/GoogleChrome/puppeteer/issues/2266
  // 进行点击
  await page.click('button#btnAddUser');
  // 检测是否生成指定样式的项目
  const finalText = await page.$eval('.user-item', el => el.textContent)
  expect(finalText).toBe('Jecyu (25 years old)')
  // await browser.close(); // 关闭连接
})
// afterAll( async done => {
//   done();
// })