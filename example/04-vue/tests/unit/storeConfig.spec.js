/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 02:51:39
 * @LastEditTime: 2019-08-09 18:04:00
 * @LastEditors: linjy
 */
import { createLocalVue } from "@vue/test-utils";
import storeConfig from "@/storeConfig";
import Vuex from "vuex"; // 直接在模拟
const localVue = createLocalVue();
localVue.use(Vuex); // 首先我们用 localVue.use 方法告诉 Vue 使用 Vuex。这只是 Vue.use 的一个包裹器。
import { cloneDeep } from "lodash";

describe(":mutations", () => {
  const store = new Vuex.Store(cloneDeep(storeConfig));
  it(":save", () => {
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

describe(":getters", () => {
  const store = new Vuex.Store(cloneDeep(storeConfig));
  it(":todosCompleted - 过滤完成的todo", () => {
    // 模拟状态
    const state = {
      todos: [
        { id: 0, title: "看书", completed: true },
        { id: 1, title: "学习", completed: false },
        { id: 2, title: "打球", completed: false }
      ]
    };
    expect(store.getters.todosCompleted.length).toBe(0);
    // 获取 getter 的结果
    // 应用 mutation
    store.commit("save", state);
    // 断言结果
    setTimeout(() => {
      expect(store.getters.todos.length).toBe(3);
      expect(store.getters.todosCompleted.length).toBe(1);
    }, 0);
  });
});
