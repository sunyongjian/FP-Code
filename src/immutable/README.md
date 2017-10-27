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

在 js 中像上面 `x = y` 的操作显然是不符合函数式编程规范的，这就意味着我们要给新对象（数据）创建一个新的引用，也就是需要数据拷贝。

先介绍几种 es5/es6 提出的几个方法吧。

- Object.assign
```js
const obj1 = Object.assign({}, obj);
obj.a = 11;
console.log(obj1);

obj.b.c = 22;

console.log(obj1);
```


- Object.freeze
 ```js
 const obj1 = Object.freeze(obj);
obj.a = 11;
console.log(obj1);

obj.b.c = 22;

console.log(obj1);
 ```
 
- deconstruction 解构
 ```js
  const obj = { a: 1, b: { c: 2 } };
const obj1 = {...obj};
obj.a = 11;
console.log(obj1);

obj.b.c = 22;

console.log(obj1);

