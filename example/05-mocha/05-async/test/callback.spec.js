const expect = require('chai').expect;
const mylib = require('../src/callback');
describe('异步代码 callback 测试', () => {
  it('should get "Hello DIST"', done => {
    mylib('DIST', rst => {
      expect(rst).to.be.equal('Hello DIST');
      done(); // 通知测试结果
    })
  });
})