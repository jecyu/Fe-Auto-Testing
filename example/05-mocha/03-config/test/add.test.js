 const add = require('../src/add.js')
 const expert = require('chai').expect;

 describe('加法函数的测试', () => {  // describe 代表一组测试
   it('1 加 1 应该等于2', () => { // 一个单独的测试
    expert(add(1,1)).to.be.equal(2);
   })
 })