module.exports = (bu, callback) =>
  process.nextTick(() => callback(`Hello ${bu}`));
