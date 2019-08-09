/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 22:56:27
 * @LastEditTime: 2019-08-09 17:26:02
 * @LastEditors: linjy
 */

export default {
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    todosCompleted(state) {
      return state.todos.filter(item => {
        return item.completed;
      });
    }
  },
  mutations: {
    save(state, todos) {
      state.todos = todos;
    }
  },
  actions: {}
};
