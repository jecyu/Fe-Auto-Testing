# Mocha

## 环境搭建

项目环境安装，安装 mocha 和 断言库 chai
```bash
yarn add mocha chai --dev
```

## Hello 例子

简单的输出一个字符串文本 index.js
```js
'use strict';
module.exports = () => 'Hello Jecyu';
```

在 package.json 里添加脚本：
```json
{
  "scripts": {
    "test:unit": "mocha"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^6.2.0"
  }
}
```

运行测试文件
```js
const mylib = require('../src')
const { expert } = require('chai');
describe('My First Test', () => {
  it('should get "Hello DIST"', () => {
    expert(mylib()).to.be.equal('Hello DIST');
  });
})
```

测试成功，输出以下结果：
```bash
huasenyumideMacBook-Pro:01-hello linjy$ yarn test:unit
yarn run v1.9.4
$ mocha


  My First Test
    ✓ should get "Hello DIST"


  1 passing (10ms)

✨  Done in 0.48s.
```

## 测试用例钩子

describe干的事情就是给测试用例分组。为了尽可能多的覆盖各种情况，测试用例往往会有很多。这时候通过分组就可以比较方便的管理（这里提一句，describe是可以嵌套的，也就是说外层分组了之后，内部还可以分子组）。另外还有一个非常重要的特性，就是每个分组都可以进行预处理（before、beforeEach）和后处理（after, afterEach）。

```js
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```
这里before会在每个分组的所有测试用例运行前，相对的after则会在所有测试用例运行后执行，如果要以测试用例为粒度，可以使用beforeEach和afterEach，这两个钩子则会分别在该分组每个测试用例运行前和运行后执行。由于很多代码都需要模拟环境，可以再这些before或beforeEach做这些准备工作，然后在after或afterEach里做回收操作。

## 配置文件 

传统模式：mocha.opts
推荐：在项目的根目录下创建一个 `.mocharc.js`，然后导出一个对象(module.exports = {/*...*/})包含您的配置。还有其他的JSON、YAML、package.json
```js
module.exports = {
  extendsion: ['js'], // js 扩展名
  reporter: 'spec', // spec 声明格式
  recursive: true,  // 递归测试子文件
  watch: true  // 监听文件变化
}
```

## 引入 babel

如果测试脚本是用ES6写的，那么运行测试之前，需要先用Babel转码。(关于 [了解babel](https://jecyu.github.io/Notebook/dailyRecord/#%E4%BA%86%E8%A7%A3-babel))

node 不承认 es6 export/import
ES6转码，需要安装Babel。

```bash
npm install babel-core babel-preset-es2015 --save-dev
```
然后，在项目目录下面，新建一个.babelrc配置文件。

```js
{
  "presets": [ "es2015" ]
}
```
最后，使用`--compilers`参数指定测试脚本的转码器。
```bash
../node_modules/mocha/bin/mocha --compilers --require babel-core/register
```
当然，也可以写到配置文件中：
```js
module.exports = {
  extendsion: ['js'],
  reporter: 'spec',
  recursive: true,
  // spec: "test/**/*.spec.js",
  require: 'babel-core/register' // es6
}
```

## 测试异步代码

### 回调

这里传入it的第二个参数的函数新增了一个done参数，当有这个参数时，这个测试用例会被认为是异步测试，只有在done()执行时，才认为测试结束。那如果done()一直没有执行呢？Mocha会触发自己的超时机制，超过一定时间（默认是2s，时长可以通过--timeout参数设置）就会自动终止测试，并以测试失败处理。

源文件
```js
module.exports = (bu, callback) =>
  process.nextTick(() => callback(`Hello ${bu}`));
```
测试文件
```js
const expect = require('chai').expect;
const mylib = require('../src/callback');
describe('异步代码 callback 测试', () => {
  it('should get "Hello DIST"', done => {
    mylib('DIST', rst => {
      expect(rst).to.be.equal('Hello DIST');
      done(); // 通知测试结果
    })
  });
})
```

### Promise

源文件
```js
module.exports = bu => new Promise(resolve => resolve(`Hello ${bu}`));
```

测试文件
```js
const expect = require('chai').expect;
const mylib = require('../src/promise');
describe('异步代码支持 promise 测试', () => {
  it('Welcome to DIST', () => {
    mylib('DIST').then(str => {
      expect(str).to.be.equal('Hello DIST');
    })
  })
})
```

### 整个文件异步

有时候，我们可能并不只是某个测试用例需要异步，而是整个测试过程都需要异步执行。比如测试Gulp插件的一个方案就是，首先运行Gulp任务，完成后测试生成的文件是否和预期的一致。那么如何异步执行整个测试过程呢？

Mocha提供了异步启动测试，只需要在启动Mocha的命令后加上`--delay`参数，Mocha就会以异步方式启动。这种情况下我们需要告诉Mocha什么时候开始跑测试用例，只需要执行`run()`方法即可
    
使用"mocha --delay"执行测试脚本。"mocha --delay"会添加一个特殊的函数run()到全局的上下文。当异步操作完成后, 执行run函数可以开始执行测试用例。 

```js
const expect = require('chai').expect;
const mylib = require('../src/promise');
setTimeout(() => { 
  run(); // 异步操作完成后，执行 run 函数可以开始执行测试用例
  describe('异步代码', () => {
    it('Welcome to DIST', () => {
      mylib('DIST').then(str => {
        expect(str).to.be.equal('Hello DIST');
      })
    })
  })
}, 1000);
```

## TypeScript

### 配置

1. 安装 `typeScript`，把 `.ts` 文件编译成 js 文件
```bash
npm install typescript
```
2. 安装 `@type/mocha` 和 `ts-node`， `ts-node` 它提供了TypeScript的运行环境，让我们免去了麻烦的编译这一步骤。最简单的例子，在注册ts-node之后，我们就可以直接加载并运行ts文件。
```bash
npm install @type/mocha && ts-node
```
3. 在 `mocharc.js` 中添加上 ts 的处理
```json
{
  "extension": ["ts"],
  "spec": "src/**/*.test.ts", // 制定测试文件
  "require": "ts-node/register"
}
```

### 进行测试

源文件 index.ts
```ts
export default function(incomingText: string) {
  return `Hello ${incomingText}`;
}
```

测试文件
```js
import mylib from '../src';
import { expect } from 'chai'
describe('My First Test', () => {
  it('should get "Hello DIST"', () => {
    expect(mylib('DIST')).to.be.equal('Hello DIST');
  });
})
```
