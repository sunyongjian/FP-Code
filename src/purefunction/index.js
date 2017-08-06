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
// -------------------- -------------------- -------------------- --------------------

// 像 push pop 这种对原数组有修改操作的，因为原数组被永久的改变了，即产生了副作用。
// 而我们更期待一个稳定的输出。换一种说法就是固定的输入对应固定的输出，
// 也就是我们中学数学学的函数映射关系。f(x) = x * 2;  f(1) = 2, f(2) = 4
// 比如这个求三倍的函数
function triple(x) {
  return x * 3;
}
const y1 = triple(2);

// 与之对应的就是 Side Effects， 产生副作用的函数

var y2;

function tripleEffect(x) {
  y2 = x * 3;
}
tripleEffect(3);
tripleEffect(3);

// tripleEffect 也是求三倍，只不过他是比较偏过程，更有局限性的，如果需要操作其他 y 值，
// 还需要定义另一个函数。另外它也永久的改变了 y2 的值，再执行一次 tripleEffect(3)，
// y2 已经变成了之前的 9 倍。然而业务中的代码显然没有这么简单，很容易出现你在另一个地方，
// 还需要用到 y2 并进行了副作用的操作，这样你之前用到的 y2 就被 “偷偷摸摸” 的改变了...
// 导致你之前的代码出现了 bug，而你却很难第一时间定位到错误在哪，浪费很多时间调试。

// 业务中可能出现副作用的地方：
// 发送一个 http 请求函数
// 可变数据
// 打印/log
// 获取用户输入
// DOM 查询
// -------------------- -------------------- -------------------- --------------------

// 通过一个简单的例子，介绍纯函数的好处。
// say hi，首字母大写，并在句尾加感叹号。
const personName = 'tom';

function sayHi(name) {
  return `hi, ${name}`;
}

function upper(str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length)}`;
}

function loudly(str) {
  return `${str}!`;
}

console.log(loudly(upper(sayHi(personName))));


// 这里是通过三个纯函数组合实现的一个功能，当然职责单一，减少耦合等思想是很容易结合的。
// 每个函数负责自己的功能，接受参数并返回一个新的 result。纯函数的好处：
// 1.可移植性
// 比如随便一个函数都可以放到任何地方，任意项目运行。尤其是 utils 之类的。
// 2.文档化
// 从函数体就可以看出 sayHi 的作用可能是什么，并且它的参数是一个 name，返回值也会在最后return
// 3.可测试性
// 随意一个函数，只要给定输入，就会得到输出。我们的测试会更容易写。
// 4.合理性
// 如果我们写的函数，执行结果可以被一段代码代替，并且不改变程序最后的结果，那这段代码就是引用透明的。
// 以上我们的 sayHi 可以完全替换成某个字符串... 因为函数式是数学推导的过程，中间的任一等式都可被
// 一对一的等价替换。
