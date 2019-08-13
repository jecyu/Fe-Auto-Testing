// module.exports = bu => new Promise(resolve => resolve(`Hello ${bu}`));
module.exports = bu =>
  new Promise(resolve => {
    if (bu === 'Jecyu') {
      return resolve(`Welcome to DIST`);
    }
    resolve(`Hello ${bu}`);
  });
