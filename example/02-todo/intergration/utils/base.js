
// 输出文字
// exports.generateText = (name, age) => {
const generateText = (name, age) => {
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
// exports.validateInput = (text, notEmpty, isNumber) => {
const validateInput = (text, notEmpty, isNumber) => {
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

// 验证和生成
exports.checkAndGenerate = (name, age) => {
    if (
    !validateInput(name, true, false) ||
    !validateInput(age, false, true)
  ) {
    return;
  }
  return generateText(name, age);
}

exports.generateText = generateText;
exports.validateInput = validateInput;