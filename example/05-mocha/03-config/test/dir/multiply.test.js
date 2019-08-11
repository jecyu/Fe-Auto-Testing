const multiply = require('../../src/multiply.js')
const expert = require('chai').expect;

describe('乘法函数的测试', () => {  // describe 代表一组测试
  it('2 乘 2应该等于4', () => { // 一个单独的测试
   expert(multiply(2,2)).to.be.equal(4);
  })
})