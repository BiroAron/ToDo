<template>
  <div class="w-1/2 h-screen mx-auto max-w-xl min-w-[350px] font-custom">
    <div class="px-5 h-screen">
      <Header @toggle-new-visibility="toggleNewTodoVisibility"></Header>
      <div class="">
        <div :class="getTodoFormVisibility">
          <ToDoForm
            :todo="emptyTodo"
            :index="-1"
            @add-todo="addTodo"
            @delete-item="deleteItem"
          />
        </div>
      </div>
      <ToDoItems :todos="todos"> </ToDoItems>
      <div class="flex justify-center align-middle"></div>
      <div
        :class="getEmptyListImageVisibility"
        class="flex justify-center align-center"
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
import { Todo } from '../../types/Todo'

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
  todos.unshift(todoCopy)
  toggleNewTodoVisibility()
}

function deleteItem() {
  toggleNewTodoVisibility()
}

function toggleNewTodoVisibility() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function clear() {
  todos.splice(0)
}
</script>
