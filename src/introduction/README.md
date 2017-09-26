## 开始函数式
> 体会函数式编程思想的核心，让我们开始转变思想。

### 把函数作为抽象单元

还记得我们在开篇，跟面向对象编程作对比的时候说过，函数式编程思想努力把问题分解，抽象成个体。通俗点讲，就是一个程序通过分解，抽象方法，把复杂的问题提炼成几个方法，而隐藏了每个方法具体的实现细节，这些方法就是抽象单元。白话点就是，比如我要做“开车上路”这件事，我可能分解抽象成，“学驾照”，“弄一辆车”，“开车”...几步，具体我是怎么学的驾照，怎么搞来的一辆车，都是在抽象单元内部实现。
举个例子：现在有一个数组，我们写一个方法让里面的数翻倍。
```javascript
// 为了直观，我们用 es5 写。

var list = [1, 2, 3];
function doubleAry (ary) {
  return ary.map(function(item) {
    return item * 2;
  })
}
var doubledList = doubleAry(list);
```
如果要是让数组里的数据都 + 1 呢。是不是还要重新写一个函数，把步骤再实现一遍？假如说数组里出现了不是数字的值怎么办？换一种思路
```javascript
var list = [1, 2, 3];
var list1 = [4, '5', 6];
// 把这些对值的操作都抽象成方法
var double = function(value) {
  return value * 2;
}

var addOne = function(value) {
  return value + 1;
}
// 当然这不是它的完整实现
var isNumber = function(value) {
  return typeof value === 'number';
}

var error = function() {
  throw new Error('current value is not a number');
}
var warn = function() {
  console.warn('current value is not a number');
}

var operate = addOne;
var abnormal = error;

var check = function (value) {
  if(!isNumber(value)) {
    abnormal();
  }
  return value;
}

var mapAry = function(ary) {
  return ary.map(function(item) {
    return  operate(check(item));
  })
}

console.log(mapAry(list)); // [2, 3, 4];
console.log(mapAry(list1)); // [5, "51", 7] && warn

// 替换
operate = double;
abnormal = warn;

console.log(mapAry(list)); // [2, 4, 6];
console.log(mapAry(list1)); // Uncaught Error: current value is not a number

```
我们把所有的操作都抽象成了方法，比如对数组的操作 ```operate``` 方法和异常校验，我们可以通过重新定义，实现操作的替换。比如 double 换成了 addOne。当然这里用的方式不是最好的，因为还要结合其他思想，这只是在证明，抽象方法带来的方便。由于行为包含在单一的函数中，所以函数可以被提供类似行为的新函数取代，或直接被完全不同的行为所取代。

通常可能是这样做的，结合柯理化，map 作为高阶函数的特性，去处理。
```javascript
var mapAry = function(fn) {
  return function(ary) {
    return ary.map(fn);
  }
}
var doubleAry = mapAry(double);
var addAry = mapAry(addOne);
```

我这里并没加校验，多个函数同时操作的情况，需要一种类似于管道的操作 compose，后面再讲。
