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

  // if (
  //   !validateInput(newUserNameInput.value, true, false) ||
  //   !validateInput(newUserAgeInput.value, false, true)
  // ) {
  //   return;
  // }

  const userList = document.querySelector('.user-list');
  const outputText = generateText(newUserNameInput.value, newUserAgeInput.value);
  const element = createElement('li', outputText, 'user-item');
  userList.appendChild(element);
};
initApp();
