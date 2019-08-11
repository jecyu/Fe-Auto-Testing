const mylib = require('../src')
const expert = require('chai').expect;
describe('My First Test', () => {
  it('should get "Hello DIST"', () => {
    expert(mylib()).to.be.equal('Hello DIST');
  });
})