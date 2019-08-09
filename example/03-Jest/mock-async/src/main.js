/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 13:13:48
 * @LastEditTime: 2019-08-09 12:31:39
 * @LastEditors: linjy
 */
// const { fetchData } = require('./http');
const { printUser } = require('./util')
const initApp = () => {
  // 给按钮注册监听事件
  const newUserButton = document.querySelector('#getUserBtn');  // 浏览器环境
  newUserButton.addEventListener('click', printUser);
};

// const getUser = () => {
//   return fetchData().then(data => {
//     const name = data.name;
//     const age = data.age;
//     return {
//       name,
//       age
//     }
//   })
// }

// const printUser = () => { 
//   getUser().then(user => {
//     console.log(user);
//   })
// };
initApp();

// exports.printUser = printUser;
