<template>
  <div class="w-1/2 h-screen mx-auto max-w-xl min-w-[350px]">
    <div class="px-5 h-screen">
      <Header @toggle-visibility="toggleVisibility"></Header>
      <div class="flex justify-center align-center">
        <div
          :class="getTodoFormVisibility"
          class="mb-10 border border-black rounded-xl border-2"
        >
          <ToDoForm @add-todo="addTodo" />
        </div>
      </div>
      <ToDoItems :todos="todos" @delete-item="deleteItem" />
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
import Header from './Header.vue'
import ToDoItems from './ToDoItems.vue'
import { Todo } from '../types/Todo'
import EmptyListImage from './EmptyListImage.vue'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>([])

const getTodoFormVisibility = computed(() =>
  isNewElementFormActive.value ? 'block' : 'hidden'
)
const getEmptyListImageVisibility = computed(() =>
  !isNewElementFormActive.value && !todos.length ? 'block' : 'hidden'
)

function addTodo(todo: Todo) {
  const todoCopy = { ...todo }
  todos.push(todoCopy)
  toggleVisibility()
}

function deleteItem(index: number) {
  todos.splice(index, 1)
}

function toggleVisibility() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function clear() {
  todos.splice(0)
}
</script>
