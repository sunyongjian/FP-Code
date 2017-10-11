const ary = [-1, -5, -33, -22, -1, 0, 2, 3, 22];
console.log(ary.sort());
// [ -1, -1, -22, -33, -5, 0, 2, 22, 3 ]
// ary.sort，当 sort 中不传入比较器的时候，默认是按照字符编码的顺序排序，即第一个数字的顺序。
// 当然这是有问题的。

// 升序
const compare = (x, y) => {
  if (x > y) return 1;
  if (x < y) return -1;
  return 0;
};
// 比较器抽象成函数
console.log(ary.sort(compare));

// [ -33, -22, -5, -1, -1, 0, 2, 3, 22 ]

// but，这个 compare 函数不通用于比较，比如
if (compare(1, 1)) {
  console.log('equal');// no log
}

// 把 等于或小于的比较 抽象成函数
const thanOrEqual = (x, y) => x >= y;

if (thanOrEqual(1, 1)) {
  console.log('thanOrEqual'); // thanOrEqual
}

// 改装成 sort 需要的比较器。它接收一个行为函数，返回 sort 所需的比较器函数，然后可以通过传入不同的 behavior，实现不同的比较器

const compartor = behavior => (x, y) => {
  if (behavior(x, y)) return 1;
  return -1;
};

console.log(ary.sort(compartor(thanOrEqual)));
//  [ -33, -22, -5, -1, -1, 0, 2, 3, 22 ]

// 当然你也可以改成降序的

const lessOrEqual = (x, y) => x <= y;

console.log(ary.sort(compartor(lessOrEqual)));
//  [22, 3, 2, 0, -1, -1, -5, -22, -33]

