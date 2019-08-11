import mylib from '../src';
import { expect } from 'chai'
describe('My First Test', () => {
  it('should get "Hello DIST"', () => {
    expect(mylib('DIST')).to.be.equal('Hello DIST');
  });
})