## 一等公民
我一直觉得“一等公民”这个词翻译过来一看是很容易产生歧义的，英文是 first-class objects（first-class citizens）。首先我们来解释一下 first-class 是什么。首先，类型规定了值的可取范围，比如 int， string， class等等，这就是类型。根据类型的值的可赋值情况，可以把类型分成三类：
- first-class 类型的值可以传给子程序作为参数，可以从子程序里返回，可以赋给变量。大多数程序设计语言里，整型、字符类型等简单类型都是一级的。 
- second-class 该等级类型的值可以传给子程序作为参数，但是不能从子程序里返回，也不能赋给变量。 
- third-class 该等级类型的值连作为参数传递也不行。
[参考](https://www.zhihu.com/question/27460623)
那我们就理解了什么是 first-class 了。在函数式编程的思想中，函数是 first-class 的，这个概念是 Christopher Strachey 提出的，并有几个原则，是我们上面提到的。函数：
- 可以被命名为变量
- 可以作为程序的参数
- 可以作为程序的返回值
- 可以包含在数据结构里
这么看来，在 JS 中 function 是满足以上几个原则的。我们通过代码来详细解释以下这几个原则
1.  作为变量  
  ```javascript
  const add = function (x, y) {
    return x + y;
  }
  ```

2.  参数
  ```javascript
  const base = [1, 2, 3];
  const double = function (num) {
    return num * 2;
  }
  const result = base.map(double);
  // double 就是 map 函数的参数
  ```
3.  返回值
  ```javascript
  function currying (fn, ...ahead) {
    return function (...behind) {
      return fn(...ahead, ...behind);
    }
  }
  const add = function(x, y) {
    return x + y;
  }
  const add2 = currying(add, 2);
  const num = 1;
  const result = add2(add2(add2(add2(num))));
  ```
  currying 函数执行后的返回值就是一个函数。由于是例子，是我随性写的... 你可以先不去关注代码在干什么，后面会提到curry 的概念。
4.  数据结构
  ```javascript
  const add = function(x, y) {
    return x + y;
  }
  const obj = {
    add: add,
  }
  const ary = [add];
  ```