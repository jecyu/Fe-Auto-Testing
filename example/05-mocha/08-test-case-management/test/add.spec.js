const add = require('../src/add.js')
const expert = require('chai').expect;

describe('加法函数的测试', () => {  
  it.only('1 加 1 应该等于2', () => { 
   expert(add(1,1)).to.be.equal(2);
  })
  it('任何数加0应该等于自身', () => { 
   expert(add(1,0)).to.be.equal(1);
  })
})