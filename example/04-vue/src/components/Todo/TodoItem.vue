<!--
 * @Description: Todo
 * @Author: linjy
 * @Date: 2019-08-08 21:26:27
 * @LastEditTime: 2019-08-08 23:21:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="todoItem">
    <span :class="{ completed: todo.completed }" @dbclick="editTodo(todo)">{{
      todo.title
    }}</span>
    <input type="button" value="标为完成" @click="markAsCompleted(todo)" />
    <input type="button" value="删除" @click="removeTodo(todo)" />
    <input
      type="text"
      value="编辑 todo..."
      v-focus="true"
      v-if="editedTodo !== null && editedTodo.id === todo.id"
      v-model="todo.title"
      @keyup.enter="editDone(todo)"
      @keyup.esc="cancelEdit(todo)"
    />
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      editedTodo: null // 用户暂存编辑前的 todo 状态
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    editing() {
      return this.editedTodo !== null && this.editedTodo.id === this.todo.id;
    }
  },
  methods: {
    // 标记完成
    markAsCompleted(todo) {
      todo.completed = true;
    },
    // 移除
    removeTodo(todo) {
      this.$emit("remove-todo", todo);
    },
    // 编辑
    editTodo(todo) {
      this.editedTodo = { id: todo.id, title: todo.title };
    },
    // 编辑完成
    editDone() {
      this.editedTodo = null;
    },
    // 取消编辑
    cancelEdit(todo) {
      todo.title = this.editedTodo.title;
      this.editedTodo.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
</style>
