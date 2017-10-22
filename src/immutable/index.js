
const Immutable = require('immutable');
const a = { a: 1 };
const b = { b: 2 };
const aa = Immutable.Map(a);
const bb = Immutable.Map(b);
// console.log(, 'aa');
for(const val of aa.merge(bb)) {
  console.log(typeof val);
}
