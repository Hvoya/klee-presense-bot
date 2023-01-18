const Bottleneck = require('bottleneck/es5');

const limiter = new Bottleneck({
  maxConcurrent: 50,
  minTime: 150
});

module.exports = {
  limiter
};
