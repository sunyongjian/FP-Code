const log = (...smt) => {
  console.log(...smt);
};

const logger = (item, index) => {
  console.log(item, index);
};
module.exports = {
  log,
  logger,
};
