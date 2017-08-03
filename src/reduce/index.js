const { logger } = require('../utils');

// 做个 Reverse && UpperCase 的 demo

// 1. usual
const str = 'hello world';
const upperCase = str => str.toUpperCase();

const reverse = str => str.split('').reverse().join('');

// console.log(upperCase(reverse(str)));

// 2. reduce

// first simple
const result0 = [reverse, upperCase].reduce((res, cur) => {
  return cur(res);
}, str);

// 3. 然后 reduce 的 functor 可以提取出来，形参叫 state， action 更直观
const reducer = (state, action) => action(state);
const result1 = [reverse, upperCase].reduce(reducer, str);

// 4. 更进一步我们把参数也放到 funcs 数组的第一项，让 reduce 自动传入

const result2 = [str, reverse, upperCase].reduce(reducer);

// 5. 不太优雅，柯理化改造

const reverseUpper = args => [args, reverse, upperCase].reduce(reducer);
const result3 = reverseUpper(str);


// 6. 提取一个公共的方法，去处理函数组合， 以及参数的传入
const compose = (...funcs) => args => funcs.reduce(reducer, args);
const result4 = compose(reverse, upperCase)(str);

[result0, result1, result2, result3, result4].map(logger);
