import { expect } from 'chai';
import {
  triple,
  y2,
  tripleEffect,
  sayHi,
  upper,
  loudly,
} from '../src/feature/pureFunction';

describe('get a triple result', () => {

  it('2 * 3 = 6', () => {
    expect(triple(2)).equal(6);
  });
  it('tripleEffect', () => { // 非要测的话。把 tripleEffect 依赖的变量导出。但是如果依赖多个变量呢？
    tripleEffect(2);
    expect(y2).equal(6);
  });
});

describe('大声的喊你好', () => {
  it('get result', () => {
    const str1 = sayHi('tom');
    expect(str1).equal('hi, tom');

    const str2 = upper(str1);
    expect(str2).equal('Hi, tom');

    const str3 = loudly(str2);
    expect(str3).equal('Hi, tom!');
  });
});
