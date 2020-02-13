<!--
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-05 16:41:32
 * @LastEditTime : 2020-02-13 16:04:34
 * @LastEditors  : linjy
 -->
# Jest

## 环境搭建

```bash
yarn add jest --dev
```

添加到 package.json 中
```json
{
  "scripts": {
    "test:unit": "jest"
  },
  "devDependencies": {
    "jest": "^24.8.0"
  }
}

```

## Mock 使用

mock是一种通过用可以控制和检查的对象替换依赖项来隔离测试主题的技术。

为什么需要 mock 函数呢？在项目中，一个模块的方法内常常会去调用另外一个模块的方法。在单元测试中，我们可能并不需要关心内部调用的方法的执行过程和结果，只想知道它是否被正确调用即可。

- 捕获函数的调用情况
- 设置函数返回值
- 改变函数的内部实现

<img :src="$withBase('/assets/jest-mock.png')">

我们可以通过下面的 api 进行 mock 函数的创建：
- jest.fn() mock 一个函数
```js
test("returns undefined by default", () => {
  const mock = jest.fn();

  let result = mock("foo");

  expect(result).toBeUndefined();
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith("foo");
});
```
- jest.mock() mock 一个模块
- jest.spy() 用于监听模块行为

### mock 单个函数

#### 一个长轮询工具函数

源代码：
```js
/**
 * @class PollingAction
 * @param {Function}  callback[回调函数]
 * @param {Number}  time[轮询时间]
 * @param {immediate}  immediate[是否立即执行回调函数]
 * @description  通过给定的TIME进行轮询操作
 */
export default class PollingAction {
  constructor(callback, time = 1000, immediate = false) {
    // 执行状态
    this.running = false;
    // 轮询间隔
    this.time = time;
    // 是否立即执行
    this.immediate = immediate;
    // callback判断
    if (callback) {
      if (typeof callback === "function") {
        this.callback = callback;
      } else {
        throw new Error("参数1 必须是个函数");
      }
    } else {
      this.callback = null;
    }
    // timer控制
    this.timer = null;
  }
  // 执行轮询
  start() {
    // 是否立即执行
    if (this.immediate) {
      this.callback && this.callback();
    }
    this.running = true;
    const onAction = () => {
      this.timer = setTimeout(() => {
        if (this.running) {
          try {
            this.callback && this.callback();
          } catch (error) {
            console.log(error);
            this.cancel();
          }
          return onAction();
        } else {
          return;
        }
      }, this.time);
    };
    return onAction();
  }
  // 取消轮询
  cancel() {
    this.running = false;
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  }
}
```
源代码主义看输入的参数以及功能函数如取消、启动，这样更方便我们写测试用例。下面是测试用例：
```js
import PollingAction from "@/utils/pollingAction";
// jest.useFakeTimers();
describe('测试 pollAction轮询类', () => {
  beforeEach(() => {
    return jest.useFakeTimers();
  });

  test('测试非立即执行轮询', () => {
    const time = 1000;
    const callback = jest.fn();
    const po = new PollingAction(callback, time, false);

    // 触发轮询
    po.start();

    // 此刻不应该触发回调，1000ms 后才触发
    expect(callback).not.toBeCalled();

    // 有2种时间快进方法
    // jest.advanceTimersByTime(1000);
    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), time);// 设置触发时机

    // 消耗时间
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2); // 第2次触发
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), time);

    // 取消轮询
    po.cancel();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2); // po.cancel 生效，回调仍然只执行 2 次

  });

  test('测试立即执行轮询', () => {
    const time = 1000;
    const callback = jest.fn();
    const po = new PollingAction(callback, time, true);

    po.start();

    // start 立马执行回调
    expect(callback).toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), time);

    po.cancel();
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);

  })
});
```
注意 Jest 通过 `jest.fn()`来模拟一个函数，后面就可以实用 toHaveBeenCalledxxx 这些 api 方便我们调用函数了。

### mock 整个包
 
#### 一个异步请求用户信息的例子

待完成描述部分。建议直接去看附带的 demo，example/04-jest/mock-async 部分。


## 添加 TypeScript 支持

[TypeScript](http://www.typescriptlang.org/) 是 JavaScript 的一个超集，主要提供了类型系统和对ES6 的支持，它由 Microsoft 开发，[代码开源于 Github 上](https://github.com/Microsoft/TypeScript)。

example/03-Jest/typeScript 目录
```bash
|--src
|--|--utils
|--|--|__math.ts
|--tests
|  |__math.spec.ts
```

1. 安装包 `yarn add typescript --dev`，然后把 `.js` 改为 `.ts` 扩展名，并根据 TypeScript 语法编写逻辑代码。

Before
```js
// math.js
export const sum = function(a, b) {
  // 类型判断
  if (Object.prototype.toString.call(a) !== '[object Number]' || Object.prototype.toString.call(b) !== '[object Number]') {
    return null;
  }
  return a + b;
};

export const mul = (a, b) => a * b;
export const sub = (a, b) => a - b;
export const div = (a, b) => a / b;
```

```js
// math.spec.js
import { sum } from '../utils/math';
describe('test math function', () => {
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
  })
})
```

After 
```ts
// math.ts //  TypeScript => 是用来定义函数的，函数左边是似乎如类型
 export const sum: (a: number, b: number) => number =  function(a: number, b: number): number {
    return a + b;
  };
  export const mul: (a: number, b: number) => number =  function(a: number, b: number): number {
    return a + b;
  };
  export const sub: (a: number, b: number) => number =  function(a: number, b: number): number {
    return a + b;
  };
  export const div: (a: number, b: number) => number =  function(a: number, b: number): number {
    return a + b;
  };
```

```ts
// math.spec.ts
import { sum } from '../src/utils/math';
describe('test math function', () => {
  it('Adding 1 + 1 equals 2', () => {
    expect(sum(1,1)).toBe(2)
  })
})
```

2. 在与 `package.json` 同目录下新增 `tsconfig.json`，添加 TypeScript 配置。
```js
{
  "compilerOptions": {
      "target": "es5",
      "strict": true,
  },
  "include": [
      "src/**/*",
      "tests/**/*"
  ],
  "exclude": [
      "node_modules",
  ]
}
```

这个时候使用 ` tsc src/utils/math.ts` 可以成功对 ts 文件进行编译。

3. 使用 Jest 测试 TypeScript 代码需要借助 `ts-jest` 解析器，而且需要 `@type/jest` 类型声明，避免找不到如 `describe` 模块。注意的是，如果在上述文件 `tsconfig.json` 中声明了 `types` 字段且不为空，这时候需要把 `jest` 字段添加进 `types` 里，这个设置是告诉 TypeScript 从 `@type` 包中寻找哪些声明文件。

所以需要安装依赖：
`yarn add ts-jest @types/jest --dev`

然后修改 `jest.config.js` 配置文件，将 ts 文件解析器设置为 `ts-jest`。

```js
// jest.config.js
module.exports = {
  collectCoverage: true,
  transform: {
      '^.+\\.tsx?$': 'ts-jest',
  }
}
```

另外，在 `package.json` 添加 scripts 测试命令。
```json
{
  "name": "typeScript",
  "version": "1.0.0",
  "description": "jest + ts",
  "main": "index.js",
  "author": "Jecyu",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "@types/jest": "^25.1.2",
    "jest": "^25.1.0",
    "ts-jest": "^25.2.0",
    "typescript": "^3.7.5"
  },
  "dependencies": {}
}

```

最后，运行 `yarn test` 即可测试 TypeScript 代码。