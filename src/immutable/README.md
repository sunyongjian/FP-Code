## 不可变数据

### 为什么要有不可变数据
从 js 中的一个栗子开始：
```js
var x = {
    a: 1
}
var y = x;
x.a = 2;
console.log(y); //{ a: 2 }
```
这在我们刚开始学 js 的时候就知道了，`x = y` 是对象赋值引用，两者公用一个对象的空间，所以 x 改动了，y 自然也改变。

数组也是一样的：
```js
var ary = [1, 2, 3];
var list = ary;
ary.push(4);
console.log(list); // [1, 2, 3, 4]
```
不过字符串和数组就不会。
```js
var str = 'hello world';
var sub = str;
str = str.slice(0, 5);
console.log(sub); // 'hello world'

var a = 1;
var b = a;
a += 2;
console.log(b); // 1
```

在介绍纯函数的时候（pure function），我们提到过“副作用”，其实可变数据也是容易造成“副作用”。而函数式默认的数据是不可变的，这样我们在执行纯函数的时候，才能确保固定的输入对应固定的输出（我输入一个数组到函数里，返回值必须是一个新数组），而且也不会造成数据的不可见变化。

### 数据拷贝

在 js 中像上面 `y = x` 的操作显然是不符合函数式编程规范的，这就意味着我们要给新对象（数据）创建一个新的引用，也就是需要数据拷贝。

#### Object.assign
像这样：
```js
const x = { a: 1 };

const y = Object.assign({}, x);
x.a = 11;
console.log(y); // { a: 1 }
```
诚然，此次对 y 的赋值，再去改变 x.a 的时候，y.a 并没有发生变化，保持了不变性。你以为就这么简单吗？看另一个栗子：

```js
const x = { a: 1, b: { c: 2 } };

const y = Object.assign({}, x);

x.b.c = 22;

console.log(y); // { a: 1, b: { c: 22}}
```
对 x 的操作，使 y.b.c 也变成了 22。为什么？因为 Object.assign 是浅拷贝，也就是它只会赋值对象第一层的 kv，而当第一层的 value 出现 object/array 的时候，它还是会做赋值引用操作，即 x，y 的 b 共用一个 `{c: 2}` 的地址。还有几个方法也是这样的。

#### Object.freeze
 ```js
const x = { a: 1, b: { c: 2 } };
const y = Object.freeze(x);
x.a = 11;
console.log(y);

x.b.c = 22;

console.log(y); // { a: 1, b: { c: 22}}
 ```
freeze，看起来是真的“冻结”了，不可变了，其实效果是一样的，为了效率，做的浅拷贝。

#### deconstruction 解构
```js
const x = { a: 1, b: { c: 2 } };
const y = { ...x };
x.a = 11;
console.log(y);

x.b.c = 22;

console.log(y);
```
es6 中的新方法，解构。数组也一样：

```js
const x = [1, 2, [3, 4]];
const y = [...x];
x[2][0] = 33;
console.log(y); // [1, 2, [33, 4]]
```
同样是浅拷贝。

#### deep-clone
拿上面的栗子来说，我们去实现深拷贝。
```js
const x = { a: 1, b: { c: 2 } };
const y = Object.assign({}, x, {
  b: Object.assign({}, x.b)
})

x.b.c = 22;

console.log(y); // { a: 1, b: { c: 2 } }
```

而更深层次的，就需要更复杂的操作了。通常实现 deep-clone 的库：lodash，$.extend()... 目前最好用的是 `immutable.js`。


### 数据持久化

不变性可以让数据持久化变得容易。当数据不可变的时候，我们的每次操作，都不会引起初始数据的改变。也就是说在一定时期内，这些数据是永久存在的，而你可以通过读取，实现类似于“回退/切换快照”般的操作。这是我们从函数式编程来简单理解这个概念，而不涉及硬盘存储或者数据库存储的概念。

首先，无论数据结构的深浅，每次操作都对整个数据结构进行完整的深拷贝，效率会很低。这就牵扯到在做数据拷贝的时候，利用数据结构，做一些优化。例如，我们可以观察某次操作，到底有没有引起深层次数据结构的变化，如果没有，我们是不是可以只做部分改变，而没变化的地方，还是可以共用的。**这就是部分持久化**。

### 序列化

数据交换和传输