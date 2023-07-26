<template>
  <div class="w-1/2 mx-auto max-w-xl">
    <div class="px-5">
      <Header @toggle-visibility="toggleVisibility"></Header>
      <div class="flex justify-center align-center">
        <div
          :class="isNewElementFormActive ? 'block' : 'hidden'"
          class="bg-gray-200 w-full mb-10"
        >
          <ToDoForm @add-todo="addTodo" />
        </div>
      </div>
      <ToDoItem :todos="todos" @delete-item="removeItem" />
      <div class="flex justify-center align-middle">
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
import { reactive, ref } from 'vue'
import ToDoForm from './ToDoForm.vue'
import Header from './Header.vue'
import ToDoItem from './ToDoItems.vue'
import { Todo } from './types'

const isNewElementFormActive = ref(true)

const todos = reactive<Todo[]>([])

function addTodo(todo: Todo) {
  const todoCopy = { ...todo }
  todos.push(todoCopy)
}

function removeItem(index: number) {
  todos.splice(index, 1)
}

function toggleVisibility() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function clear() {
  todos.splice(0)
}
</script>
