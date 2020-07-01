# 为什么要测试

为什么要测试呢？测试是为了及时发现错误，保证系统程序的正常运行。

以前不喜欢写测试，主要是觉得编写和维护测试用例非常的浪费时间。在真正写了一段时间的基础组件和基础工具后，才发现自动化测试有很多好处。测试最重要的自然是提升代码质量。代码有测试用例，虽不能说百分百无bug，但至少说明测试用例覆盖到的场景是没有问题的。有测试用例，发布前跑一下，可以杜绝各种疏忽而引起的功能bug。

自动化测试另外一个重要特点就是快速反馈，反馈越迅速意味着开发效率越高。拿UI组件为例，开发过程都是打开浏览器刷新页面点点点才能确定UI组件工作情况是否符合自己预期。**接入自动化测试以后，通过脚本代替这些手动点击，接入代码watch后每次保存文件都能快速得知自己的的改动是否影响功能，节省了很多时间，毕竟机器干事情比人总是要快得多。**

自动化的收益 = 迭代次数 * 全手动执行成本 - 首次自动化成本 - 维护次数 * 维护成本

<img :src="$withBase('/assets/why-test.png')">

## 一个简单的例子

下面我们来实现一个加法函数：
```js
// math.js
function sum(a, b) {
  return a + b;
}
export default {

}
```
供外部使用
```js
// index.js
const { sum } = require('math')
console.log(sum(1, 1)); // 2
console.log(sum('1', '1')); // 11
```

相信不少同学和我一样，写一个功能函数时，往往都是靠着`console.log`敲出来的。虽然还有更多 `console.*`打印方式来打印表格，但是这样手动打印的效率的确费了不少时间，而且`console.*`还会受到异步的影响。下面对比下测试工具：
测试的例子
```js
// add.spec.js
const { sum, mul, sub, div } = require('../src/math');
describe('test math function', () => {
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
    expect(sum('1','1')).toBe(2) // 这个时候测试就会报错了
  })
})
```

让我们增加类型逻辑
```js
const sum = function(a, b) {
  if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
    return null;
  }
  return a + b;
};
```

测试用例改为
```js
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
    expect(sum('1', '1')).toBe(null); // 输入非数字返回 null
  })
```

## 总结

有了自动化测试，开发者会更加信任自己的代码。开发者再也不会惧怕将代码交给别人维护，不用担心别的开发者在代码里搞“破坏”。后人接手一段有测试用例的代码，修改起来也会更加从容。测试用例里非常清楚的阐释了开发者和使用者对于这端代码的期望和要求，也非常有利于代码的传承。