# 测试实战

通过前面的介绍后，相信同学们已经对测试有了一定的了解，纸上得来终觉浅，绝知此事要躬行。
理论讲得差不多了，是时候开始实战了，下面我们通过一个栗子 🌰。

需求分析：

- 输入用户姓名、年龄
- 输出该用户姓名、年龄信息到用户显示列表

<img :src="$withBase('/assets/todo-app.png')">

模版结构
```html
<!-- html -->
<section class="control-panel">
  <div class="input-container">
    <label for="name">Name</label>
    <input type="text" id="name" />
  </div>
  <div class="input-container">
    <label for="age">Age</label>
    <input type="text" id="age" />
  </div>
  <button id="btnAddUser" class="button">Add User</button>
</section>
<hr />
<section class="user-output">
  <ul class="user-list"></ul>
</section>
```

工具类代码
```js
// 输出文字
exports.generateText = (name, age) => {
  return `${name} (${age} years old)`;
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
```

主逻辑代码
```js
require('./style.css');
const { generateText, createElement, validateInput } = require('../utils/base');
const initApp = () => {
  // 给按钮注册监听事件
  const newUserButton = document.querySelector('#btnAddUser');
  newUserButton.addEventListener('click', addUser);
};

const addUser = () => {
  // 基于用户的输入数据，创建一个新的 HTML 元素
  // 添加到 DOM 树中
  const newUserNameInput = document.querySelector('input#name');
  const newUserAgeInput = document.querySelector('input#age');

  if (
    !validateInput(newUserNameInput.value, true, false) ||
    !validateInput(newUserAgeInput.value, false, true)
  ) {
    return;
  }

  const userList = document.querySelector('.user-list');
  const outputText = generateText(newUserNameInput.value, newUserAgeInput.value);
  const element = createElement('li', outputText, 'user-item');
  userList.appendChild(element);
};
initApp();
```
接下来，我们开始要测试代码了，首先看看测试代码的现有解决方案。