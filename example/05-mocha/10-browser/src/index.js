window.render = function() {
  const ctn = this.document.createElement('div')
  ctn.setAttribute('id', 'dist');
  ctn.appendChild(this.document.createTextNode('数慧中慧'))
  document.body.appendChild(ctn)
}