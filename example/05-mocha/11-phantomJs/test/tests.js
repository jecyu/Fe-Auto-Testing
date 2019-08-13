const expect = chai.expect;
describe('Welcome to DIST', function() {
  before(function() {
    window.render();
  })
  it('Hello', function() {
    expect(document.getElementById('dist').textContent).to.be.equal('数慧中慧')
  })
})