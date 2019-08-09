
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
