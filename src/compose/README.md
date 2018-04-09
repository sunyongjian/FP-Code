## 函数组合
> 在介绍 reduce 的时候，我们使用过 compose。compose 操作是建立

### 什么是组合
举个例子，两个函数组合：
```javascript
// f, g 函数， compose 函数
// 通过 compose 函数组合f, g， 可以做这样 f(g(x)) 的操作。 即：
// compose(f, g) -> (x) => f(g(x))

var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};
```

```js
const upperCase = str => str.toUpperCase();

const reverse = str => str.split('').reverse().join('');

// 比如现在要做一个字符串大写并倒叙的工作，通常是
var str = 'hello';
var upperStr = upperCase(str);
var reverseStr = reverse(upperStr);

// 那如果改成 compose，两个函数组合后返回新的函数。
var upperAndReverse = compose(reverse, upperCase);
var result = upperAndReverse(str);
```


### compose 满足分配率

### 更通用的 compose 函数

```js

varcompose = function(funcs) {
  return function(params) {
    
  }
}

```