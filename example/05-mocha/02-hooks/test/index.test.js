const mylib = require('../src/index')
const expert = require('chai').expect;
let bu = 'none';
describe('My First Test', () => {
  describe('Welcome to DIST', () => {
    before(() => bu = "XDATA") // 在本区块的所有测试用例之前执行
    after(() => bu = 'none') // // 在本区块的所有测试用例之后执行
    it('should get "Hello XDATA"', () => {
      expert(mylib(bu)).to.be.equal('Hello XDATA');
    });
  })
  describe('Welcome to GuangZhou', () => {
    before(() => bu = "GuangZhou")
    after(() => bu = 'none')
    it('should get "Hello GuangZhou"', () => {
      expert(mylib(bu)).to.be.equal('Hello GuangZhou');
    });
  })
})