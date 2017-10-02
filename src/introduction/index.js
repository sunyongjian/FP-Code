const ary = [-1, -5, -33, -22, -1, 0, 2, 3, 22];
console.log(ary.sort());
// [ -1, -1, -22, -33, -5, 0, 2, 22, 3 ]
// ary.sort，当 sort 中不传入比较器的时候，默认是按照字符编码的顺序排序，即第一个数字的顺序。

// 升序
const compare = (x, y) => {
  if (x > y) return 1;
  if (x < y) return -1;
  return 0;
};

console.log(ary.sort(compare));

// [ -33, -22, -5, -1, -1, 0, 2, 3, 22 ]

// but，这个 compare 函数不通用于比较，比如
if (compare(1, 1)) {
  console.log('equal');
}

const thanOrEqual = (x, y) => x >= y;

if (thanOrEqual(1, 1)) {
  console.log('thanOrEqual');
}

const compartor = behavior => (x, y) => {
  if (behavior(x, y)) return 1;
  return -1;
};

console.log(ary.sort(compartor(thanOrEqual)));
//  [ -33, -22, -5, -1, -1, 0, 2, 3, 22 ]
