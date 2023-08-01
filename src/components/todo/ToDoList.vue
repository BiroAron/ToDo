<template>
  <div class="w-1/2 h-screen mx-auto max-w-xl min-w-[350px] font-custom">
    <div class="px-5 h-screen">
      <Header @toggle-new-visibility="toggleNewTodoVisibility"></Header>
      <div :class="getTodoFormVisibility">
        <ToDoForm
          :todo="emptyTodo"
          :index="-1"
          @add-todo="addTodo"
          @delete-item="deleteNewItem"
          @update-todo-priority="updateNewTodoPriority"
        />
      </div>
      <ToDoItems
        :todos="todos"
        @update-todo-priority="updateTodoPriority"
        @toggle-task-state="toggleTaskState"
        @delete-item="deleteItem"
        @edit-todo="editTodo"
      >
      </ToDoItems>
      <div class="flex justify-center align-middle"></div>
      <div
        class="flex justify-center align-center"
        :class="getEmptyListImageVisibility"
      >
        <EmptyListImage />
      </div>
      <div class="flex justify-center align-center">
        <button
          class="bg-transparent p-2 rounded-md mb-2 border border-black"
          @click="clear"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ToDoForm from './ToDoForm.vue'
import Header from '../header/Header.vue'
import ToDoItems from './ToDoItems.vue'
import EmptyListImage from '../icons/EmptyListIcon.vue'
import { Todo, TodoPriority } from '../../types/Todo'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>([])

const emptyTodo = ref<Todo>({
  title: '',
  priority: 'Low',
  text: '',
  isChecked: false
})

const getTodoFormVisibility = computed(() =>
  isNewElementFormActive.value ? 'block' : 'hidden'
)

const getEmptyListImageVisibility = computed(() =>
  !isNewElementFormActive.value && !todos.length ? 'block' : 'hidden'
)

function addTodo(todo: Todo) {
  const todoCopy = { ...todo }
  todos.push(todoCopy)
  toggleNewTodoVisibility()
}

function deleteNewItem() {
  toggleNewTodoVisibility()
}

function deleteItem(index: number) {
  todos.splice(index, 1)
}

function toggleTaskState(index: number) {
  todos[index].isChecked = !todos[index].isChecked
}

function toggleNewTodoVisibility() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function updateNewTodoPriority(priority: TodoPriority) {
  emptyTodo.value.priority = priority
}

function updateTodoPriority(priority: TodoPriority, index: number) {
  console.log(priority)
  todos[index].priority = priority
}

function clear() {
  todos.splice(0)
}

function editTodo(todo: Todo, index: number) {
  todos[index] = todo
}
</script>
