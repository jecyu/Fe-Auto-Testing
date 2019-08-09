<!--
 * @Description: Todo
 * @Author: linjy
 * @Date: 2019-08-08 21:26:27
 * @LastEditTime: 2019-08-09 02:51:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="todoItem">
    <input type="button" value="全部标为完成" @click="markAllAsCompleted" />
    <input
      type="text"
      placeholder="添加 todo"
      v-model="newTodoTitle"
      @keyup.enter="addTodo"
    />
    <!-- todo list -->
    <div>
      <ul>
        <todo-item
          v-for="todo in filteredTodos"
          :todo="todo"
          :key="todo.id"
          @remove-todo="removeTodo"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { mapGetters } from "vuex";
var STORAGE_KEY = "todo-show";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};
export default {
  name: "NrTodo",
  components: {
    TodoItem
  },
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodoTitle: "",
      intention: "all" // 默认为 all
    };
  },
  // 监测 todos 列表的变化，将变化存储到 local storage vuex
  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos);
        this.$store.commit("save", todos); // 存到 vuex
      },
      deep: true
    }
  },
  methods: {
    addTodo: function() {
      this.todos.push(
        // 修改后的 todo 模型
        { id: todoStorage.uid++, title: this.newTodoTitle, completed: false }
      );
      this.newTodoTitle = "";
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    markAllAsCompleted() {
      this.todos.map(todo => {
        if (!todo.completed) {
          todo.completed = true;
        }
      });
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    clearAll() {
      this.todos = [];
    }
  },
  computed: {
    leftTodos() {
      return this.todos.filter(todo => !todo.completed);
    },
    leftTodosCount() {
      return this.leftTodos.length;
    },
    filteredTodos() {
      if (this.intention === "ongoing") {
        return this.leftTodos;
      } else if (this.intention === "completed") {
        return this.todos.filter(todo => todo.completed);
      } else {
        // 其它未定义的意图我们为其返回全部 todos，
        // 这里面已经包含了 all 意图了
        return this.todos;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
</style>