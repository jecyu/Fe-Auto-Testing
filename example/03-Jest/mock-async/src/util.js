/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 15:23:08
 * @LastEditTime: 2019-08-09 12:32:09
 * @LastEditors: linjy
 */
const { fetchData } = require('./http');

const getUser = async () => {
  // return fetchData().then(data => {
  //   const name = data.name;
  //   const age = data.age;
  //   return `${name} (${age} years old)`
  // })
  const data = await fetchData();
  const name = data.name;
  const age = data.age;
  return `${name} (${age} years old)`
}

const printUser = () => { 
  getUser().then(user => {
    console.log(user);
  })
};
exports.printUser = printUser;
exports.getUser = getUser;