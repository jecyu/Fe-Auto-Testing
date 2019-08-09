/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 16:18:30
 * @LastEditTime: 2019-08-09 14:32:54
 * @LastEditors: linjy
 */

const fetchData = () => {
  return Promise.resolve({ name: 'Jecyu', age: 25})
  // return new Promise(resolve => {
  //   process.nextTick(()=> {
  //     resolve({ name: 'Jecyu', age: 25})
  //   })
  // })
}
const axios = require('axios');

// const fetchData = () => {
//   console.log('获取数据...')
//   return axios
//     .get('http://localhost:8089')
//     .then(response => {
//     return response.data;
//   })
// }

exports.fetchData = fetchData;

