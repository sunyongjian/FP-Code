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
通过给 curryAdd 传入 10，我们得到了一个加 10 的函数，返回的函数，通过闭包，记住了 curryAdd 的参数，也就是说之后如果我们有同样的加 10 的操作，就不需要在执行两次 curryAdd 了，只需要执行 add10。当代码很多的时候，这种减少执行步骤的操作还是有必要的。

### 左右柯理化
柯理化把参数拆解了，上面的 curryAdd 是从左往右处理的，也就是从第一个参数开始，就是左柯理化。如果从右开始，就是右柯理化。如：
```javascript
// x + y => y, x
const rightCurryAdd = function(y) {
  return function(x) {
    return y + x;
  }
}
const tenAdd = rightCurryAdd(10);
const result1 = tenAdd(2);
```
我们可以看到，返回的函数意义已经变了，是 10 去加某个数，不过加法是支持交换律的，所以最后的结果是相同的。如果是除法呢：
```javascript
// div => division
const leftCurryDiv(x) {
  return function(y) {
    return x/y;
  }
}
const tendiv = leftCurryDiv(10);

const rightCurryDiv(y) {
  return funtion(x) {
    return x/y;
  }
}
const divTen = rightCurryDiv(10);
```
两个函数的意义不一样，一个是做除数，一个是被除数了。不过方向其实并不重要，选择怎么处理看个人的喜好，只是两种方式会有区别。另外，手动的，一次次的定义这些 curry 函数，实在是有点繁琐，我们不能用一次定义一次吧。所以就需要自动去柯理化参数的函数。


### 自动柯理化参数

### 自动柯理化
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


## 为什么要有柯理化
与其说为什么要有柯理化，不如说在 lambda 演算定义函数的时候，一个函数只能接收一个参数，这就决定了它必须通过某种技巧，让表达式去处理多个参数的运算，比如加法。所以，柯理化算是其中的一个技巧，通过返回函数，接收第二个参数，实现类似加法的操作。

### 多参的危险性
通常我们在实现一个方法的时候，涉及到多个值的操作，多参函数是再正常不过的写法，但是有时候，这种函数结合的时候，却容易出现问题。举个常见的栗子，猜猜看会得到什么结果。
```javascript
console.log([1, 2, 3].map(parseInt))
```
一眼看过去可能会觉得是[1, 2, 3]，但其实是 [1, NaN, NaN].这就是 map 函数作为高阶函数的时候，给它的参数，parseInt 传了两个参数。parseInt 恰巧第二个值是有意义的，就会造成这种不稳定的，危险的现象。

一个解决办法是，让传给 map 函数的实参函数，变成单一值的函数。

```javascript
console.log([1, 2, 3].map((x) => parseInt(x)));
```

当然，这也不算是一个很经典的栗子，只是说，多参可能存在的风险。但是，不是说我们要拒绝多参数函数，现代编程的大多数情况下，多参数确实会提高一些效率，简化一些步骤。

### 操作数组的例子
现在有一个需求，一组数据，我们进行操作。例子还没想好...
