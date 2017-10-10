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

### 