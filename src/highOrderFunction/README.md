## HOF
High Order Functions，即高阶函数，至少满足其下两个条件之一：
- 以一个函数作为参数
- 以一个函数作为返回结果

这都是在满足函数是 "first-class" 的情况下，出现的技巧。


```javascript
function HOF(...){
  return function(...){
    //...
  }
}
```

### 函数作为参数
比如操作数组的 map，reduce 函数，都是此类。


### 函数作为返回值
