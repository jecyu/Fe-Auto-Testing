<!--
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-05 16:41:32
 * @LastEditTime: 2019-08-11 23:54:12
 * @LastEditors: linjy
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


