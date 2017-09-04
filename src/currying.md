## 简介
> 柯理化，是把接收多个参数的函数，变换成接收一个单一参数的函数，并返回一个接收余下参数的函数。

这个定义显然是很抽象的。形象点来说，之前我的函数是接收多个参数的，柯理化之后呢，就变成了一次只接收单个参数，本来执行一次得到结果的，变成了执行多次。first-class 中的一个例子：

```javascript
const add = function(x, y) {
  return x + y;
}
console.log(add(1, 2));

// currying 后

const curryAdd = function(x) {
  return function(y) {
    return x + y;
  }
}
console.log(curryAdd(1)(2));

```
这样你显然觉得是多此一举的，但是如果换一种写法呢
```javascript
const add10 = curryAdd(10);
const result = add10(2);
```
通过给 curryAdd 传入 10，我们得到了一个加 10 的函数，也就是说之后如果我们有加 10 的操作，就不需要在执行两次 curryAdd 了，只需要执行 add10。当代码很多的时候，这种减少执行步骤的操作还是有必要的。那么，当其他场景需要柯理化的时候，能不能有一个通用的函数 currying 去处理需要柯理化的函数呢。


```javascript
function currying(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    var newArgs = [].concat.apply(args, arguments);
    return fn.apply(null, newArgs);
  }
}

// next
const add10 = currying(add, 10);

// es6 写更方便
const currying = (fn, ...ahead) => (...behind) => fn(...ahead, ...behind);
// 效果是一样的
```
