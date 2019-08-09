<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 16:41:16
 * @LastEditTime: 2019-08-09 17:59:26
 * @LastEditors: linjy
 -->
# 测试 Vue.js 组件

与处理浏览器中的`require`同理, 如果我们需要对 .vue 文件进行测试, 则需要通过`vue-loader`的对.vue 文件进行处理。

## 安装

假定你在一开始已经安装并配置好了 webpack、vue-loader 和 Babel——例如通过 vue-cli 创建了 webpack-simple 模板脚手架
我们要做的第一件事就是安装 Jest 和 Vue Test Utils：
```bash
$ npm install --save-dev jest @vue/test-utils
```
为了告诉 Jest 如何处理 *.vue 文件，我们需要安装和配置 vue-jest 预处理器：
```bash
npm install --save-dev vue-jest
```

## 组件化与 UI 测试

组件化并不全是为了复用，很多情况下也是为了分治，从而我们可以分组件开发，然后分别对其进行单元测试。每个组件都可以被简化为这样一个表达式，即UI = f(data)，这个纯函数返回的只是一个描述 UI 组件应该是什么样子的虚拟 DOM，本质上就是一个树形的数据结构。

### vue 组件树的测试

越上层的组件越复杂，因为它的所有子组件都有预先渲染。层次越高，你应该写的测试越少。对于 Vue 组件来说，浅渲染（Shallow Rendering）解决了这个问题。也就是说我们针对某个上层组件进行测试时，可以不用渲染它的子组件，所以就不用担心子组件的表现和行为，这样就只对特定组件的逻辑及其渲染输出进行测试。

[@vue/test-utils](https://vue-test-utils.vuejs.org/zh/) 是 Vue.js官方的单元测试实用工具库, 提供很多便捷的接口, 比如挂载组件, 设置Props, 发送emit事件等操作。

```js
import { shallowMount } from '@vue/test-utils';
const wrapper = shallowMount(Component);
wrapper.vm // 挂载的组件实例
```

## Vue 组件的渲染方式

### 浅渲染 shallowMount(component[, options]) => Wrapper

浅渲染在将一个组件作为一个单元进行测试的时候很有用，可以确保你的测试不会去间断断言子组件的行为。

### 全量渲染 mount(component[, options]) => Wrapper

 `mount` 方法则会将 Vue 组件和所有子组件渲染为真实的 DOM 节点，特别是在你依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。完成的 DOM 渲染需要在全局范围内提供完整的 DOM API，意味着  Vue Test Utils 依赖于浏览器环境。

 我们可以在真实的浏览器中运行，技术上可以实用 puppeter 实现，也可以实用 karam 可以启动不同的浏览器，更建议实用 JSDOM 在虚拟浏览器环境中运行 Node 中的测试。`jsdom`本质上是一个完全在 JavaScript 中实现的 headless 浏览器，Jest 测试运行器自动设置了 JSDOM。

...

## 测试单组件

主要看输入输出，具体应用看看一个 button 组件的测试。
<img :src="$withBase('/assets/test-component.png')">

button.vue 源码
```html
  <button type="button" :class="buttonClass" :style="buttonStyle" @click.stop.prevent="handleClick">
    <template v-if="loading">
      <i class="icon-loading ivu-load-loop ivu-icon ivu-icon-ios-loading"></i>
    </template>
    <slot></slot>
  </button>
```
```js

const prefixCls = "button";
export default {
  name: "Button",
  props: {
    // 一级、二级、三级
    level: {
      type: Number,
      default: 1
    },
    // 类型
    // default, primary, back
    type: {
      type: String,
      default: "default"
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 背景色
    bgColor: {
      type: String
    },
    // 字体颜色
    fontColor: {
      type: String
    }
  },
  computed: {
    buttonClass() {
      const { level, type, disabled, loading } = this;
      return [
        `${prefixCls}`,
        `${prefixCls}-${level}`,
        `${prefixCls}-${type}`,
        disabled && "disabled",
        loading && "loading"
      ];
    },
    buttonStyle() {
      const { bgColor, fontColor } = this;
      const style = {};
      if (bgColor) {
        style.backgroundColor = bgColor;
        style.borderColor = bgColor;
      }
      if (fontColor) {
        style.color = fontColor;
      }
      return style;
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      // 返回 event 参数支持 @click.stop.prevent 写法
      this.$emit("click", event);
    }
  }
};
```
button.vue 对应的测试文件
```js
import { mount } from "@vue/test-utils";
import NrButton from "@/components/NrButton";

describe("NrButton", () => {
  const wrapper = mount({
    render() {
      return <NrButton>follow</NrButton>;
    }
  });
  it("正确渲染组件标签", () => {
    // expect(wrapper.html()).toContain(`<button type="button" class="nr-button nr-button-1 nr-button-default">follow</button>`);
    expect(wrapper.html()).toMatchSnapshot();
  });
  describe(":props ", () => {
    it(":levels - 创建二级按钮", () => {
      const wrapper = mount({
        render() {
          return <NrButton level={2}>按钮</NrButton>;
        }
      });
      expect(wrapper.contains(".nr-button-2")).toBe(true);
    });
    it(":type - 创建 primary 按钮", () => {
      const wrapper = mount({
        render() {
          return <NrButton type="primary">按钮</NrButton>;
        }
      });
      expect(wrapper.contains(".nr-button-primary")).toBe(true);
    });
    it(":disabled - 创建 disabled 按钮", () => {
      const wrapper = mount({
        render() {
          return <NrButton disabled={true}>按钮</NrButton>;
        }
      });
      expect(wrapper.contains(".disabled")).toBe(true);
    });
    it(":loading - 创建 loading 按钮", () => {
      const wrapper = mount({
        render() {
          return <NrButton loading={true}>按钮</NrButton>;
        }
      });
      expect(wrapper.contains(".icon-loading")).toBe(true);
    });
    it(":fontColor 自定义按钮样式", () => {
      const wrapper = mount({
        render() {
          return (
            <NrButton bgColor="#cccccc" fontColor="#ffffff">
              按钮
            </NrButton>
          );
        }
      });
      expect(wrapper.element.style.backgroundColor).toBe("rgb(204, 204, 204)");
      expect(wrapper.element.style.color).toBe("rgb(255, 255, 255)");
    });
  });
  describe('@event', () => {
    it('单击按钮触发事件，改变 loading 状态', done => {
      const DefaulButton = {
        data() {
          return {
            loading: false
          }
        },
        methods: {
          handleClickButton() {
            this.loading = true;
          }
        },
        render() {
          return (
            <NrButton loading={this.loading} onClick={this.handleClickButton}></NrButton>
          )
        }
      }
      const wrapper = mount(DefaulButton); 
      wrapper.trigger('click');
      wrapper.vm.$nextTick(() => {  // nextTick 确保回调已经完成
        expect(wrapper.find('.icon-loading').exists()).toBe(true)
        done();
      })
    })
  })
});

```

## 异步行为

为了让测试变得简单，@vue/test-utils 同步应用 DOM 更新。
```js
describe('@event', () => {
    it('单击按钮触发事件，改变 loading 状态', done => {
      const DefaulButton = {
        data() {
          return {
            loading: false
          }
        },
        methods: {
          handleClickButton() {
            this.loading = true;
          }
        },
        render() {
          return (
            <NrButton loading={this.loading} onClick={this.handleClickButton}></NrButton>
          )
        }
      }
      const wrapper = mount(DefaulButton, { sync: true});
      const wrapper = mount(DefaulButton); 
      wrapper.trigger('click');
      wrapper.vm.$nextTick(() => {  // nextTick 确保回调已经完成
        expect(wrapper.find('.icon-loading').exists()).toBe(true)
        done();
      })
    })
  })
 
``` 
但是可能遇到这个警告，这是因为 vue 的版本低于2.5.18，vue-test-util 不兼容。因此，涉及异步的话，需要改下测试的写法。
```js
[vue-test-utils]: Vue Test Utils runs in sync mode by default. Due to bugs, sync mode requires Vue > 2.5.18. In Vue Test Utils 1.0 sync mode will only be supported with Vue 2.5.18+ running in development mode. If you are unable to upgrade, you should rewrite your tests to run asynchronouslyy
```
需要改成异步写法
```js
 it('单击按钮触发事件，改变 loading 状态', done => {
      const DefaulButton = {
        data() {
          return {
            loading: false
          }
        },
        methods: {
          handleClickButton() {
            this.loading = true;
          }
        },
        render() {
          return (
            <NrButton loading={this.loading} onClick={this.handleClickButton}></NrButton>
          )
        }
      }
      const wrapper = mount(DefaulButton); 
      wrapper.trigger('click');
      wrapper.vm.$nextTick(() => {  // nextTick 确保回调已经完成
        expect(wrapper.find('.icon-loading').exists()).toBe(true)
        done();
      })
    })
})
```
当然我们还可以把异步抽离出来，作为一个工具函数，`ant-design-vue` 就是这样干的
```js 
export function asyncExpect(fn, timeout) {
  return new Promise(resolve => {
    if (typeof timeout === 'number') {
      setTimeout(() => {
        fn();
        resolve();
      }, timeout)
    } else {
      Vue.nextTick(() => {
        fn();
        resolve();
      })
    }
  })
}
```

## Vuex 单元测试

一开始直接在测试用例中，引用 vuex 的实例后，想通过`mutations`、和`getters`直接读取里面的方法和属性进行测试（像普通的组件那样），但是出现了报错，原因待查明。
```js
import { mutations, getters } from "@/store";
const { save } = mutations;
```

后来直接把配置抽取出来，然后在测试用例中，进行 vuex 的引入，实例化 store，这种写法更加符合测试用例就是解释性的功能文档。
```js
import { createLocalVue } from "@vue/test-utils";
import storeConfig from "@/storeConfig";
import Vuex from "vuex"; // 直接在模拟
const localVue = createLocalVue();
localVue.use(Vuex); // 首先我们用 localVue.use 方法告诉 Vue 使用 Vuex。这只是 Vue.use 的一个包裹器。
import { cloneDeep } from "lodash";

describe("mutations", () => {
  const store = new Vuex.Store(cloneDeep(storeConfig));
  it("save", () => {
    // 模拟状态
    const state = [{ id: 0, title: "sss", completed: false }];
    expect(store.state.todos.length).toBe(0);
    // 应用 mutation
    store.commit("save", state);
    // 断言结果
    setTimeout(() => {
      expect(state.count).toBe(1);
    }, 0);
  });
});
```

详细看附带例子：example/04-vue