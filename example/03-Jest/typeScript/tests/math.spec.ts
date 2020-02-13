import { sum } from '../src/utils/math';
describe('test math function', () => {
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
  })
})