const { log } = require('../utils');

// 首先我们从操作数组的方法开始
const ary = [1, 2, 3, 4, 5];

ary.push(6);

ary.pop(6);

ary.unshift(0);

ary.shift(0);

ary.splice(3, 5);

const result = ary.concat([4, 5]);

const copy = result.slice();

const double = copy.map(item => item * 2);

log(result, copy, double, 'aa');

double.reverse();

// 回忆一下 👆 的方法，返回值是什么，还有会不会对元素组造成改变。


// 像 push pop 这种对原数组有修改操作的