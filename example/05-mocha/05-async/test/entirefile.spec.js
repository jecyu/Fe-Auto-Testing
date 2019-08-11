const expect = require('chai').expect;
const mylib = require('../src/promise');
setTimeout(() => { 
  run(); // 异步操作完成后，执行 run 函数可以开始执行测试用例
  describe('异步代码', () => {
    it('Welcome to DIST', () => {
      mylib('DIST').then(str => {
        expect(str).to.be.equal('Hello DIST');
      })
    })
  })
}, 1000);