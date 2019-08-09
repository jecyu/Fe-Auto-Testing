/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 20:53:37
 * @LastEditTime: 2019-08-09 14:16:51
 * @LastEditors: linjy
 */
// 输出文字
exports.generateText = (name, age) => {
  return `${name} (${age} years old)`;
  // return `Jecyu (25 years old)`;
}

// 创建一个新元素
exports.createElement = (type, text, className) => {
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
}

// 验证用户输入
exports.validateInput = (text, notEmpty, isNumber) => {
  if (!text) { // 空白符
    return false;
  }
  // user 文字验证
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  // age 数字验证
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
}