const expect = require('chai').expect;
const mylib = require('../src/promise');
describe('异步代码支持 promise 测试', () => {
  it('Welcome to DIST', () => {
    mylib('DIST').then(str => {
      expect(str).to.be.equal('Hello DIST');
    })
  })
})
