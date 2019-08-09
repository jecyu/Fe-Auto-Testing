/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 14:57:07
 * @LastEditTime: 2019-08-09 14:28:27
 * @LastEditors: linjy
 */
const axios = require('axios');

const fetchData = () => {
  console.log('获取数据...')
  return axios
    .get('http://localhost:8089')
    .then(response => {
    return response.data;
  })
}
exports.fetchData = fetchData;
