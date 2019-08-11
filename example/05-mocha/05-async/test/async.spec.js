const expect = require('chai').expect;
const mylib = require('../src/promise');
describe('异步代码支持 async/await 测试', () => {
  it('Welcome to DIST', async function() {
    const str = await mylib('DIST');
    expect(str).to.be.equal('Hello DIST')
  })
})
