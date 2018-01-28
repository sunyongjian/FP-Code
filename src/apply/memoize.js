// 单个参数
const memoize = (f) => {
  const cache = {};
  return (str) => {
    if (!cache[str]) {
      cache[str] = f(str);
    }
    return cache[str];
  };
};

const capitalized = (str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length)

const memoCap = memoize(capitalized);

console.time('capitalized');
console.log(memoCap('sunyongjian'));
console.timeEnd('capitalized');


console.time('capitalized');
console.log(memoCap('sunyongjian'));
console.timeEnd('capitalized');

console.time('capitalized');
console.log(memoCap('sunyongjian'));
console.timeEnd('capitalized');

console.time('capitalized');
console.log(memoCap('sunyongjian'));
console.timeEnd('capitalized');

// 第一次大写的处理可能需要 几毫米，有了缓存后，之后几乎是 0.025ms，节省很多的性能。
// 不过这个只是一个普通的栗子，单个参数是没问题，如果是多个参数呢.

let fibonacci = (n) => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

console.time('fibonacci');
console.log(fibonacci(20));
console.timeEnd('fibonacci');

// fibonacci = memoize(fibonacci);

// console.time('memoizeFib');
// console.log(fibonacci(20));
// console.timeEnd('memoizeFib');
