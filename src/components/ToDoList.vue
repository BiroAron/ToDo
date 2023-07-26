<template>
  <div class="w-1/2 mx-auto max-w-xl min-w-[414px]">
    <div class="px-5">
      <Header @toggle-visibility="toggleVisibility"></Header>
      <div class="flex justify-center align-center">
        <div
          :class="isNewElementFormActive ? 'block' : 'hidden'"
          class="mb-10 border border-black rounded-xl border-2"
        >
          <ToDoForm @add-todo="addTodo" />
        </div>
      </div>
      <ToDoItem :todos="todos" @delete-item="removeItem" />
      <div class="flex justify-center align-middle"></div>
      <div
        :class="shouldEmptyListImageBeDisplayed ? 'block' : 'hidden'"
        class="flex justify-center align-center"
      >
        <EmptyListImage />
      </div>
      <button
        class="bg-transparent p-2 rounded-md mb-2 border border-black"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ToDoForm from './ToDoForm.vue'
import Header from './Header.vue'
import ToDoItem from './ToDoItems.vue'
import { Todo } from './types'
import EmptyListImage from './EmptyListImage.vue'

const shouldEmptyListImageBeDisplayed = computed(
  () => !isNewElementFormActive.value && !todos.length
)

const isNewElementFormActive = ref(true)

const todos = reactive<Todo[]>([])

function addTodo(todo: Todo) {
  const todoCopy = { ...todo }
  todos.push(todoCopy)
  toggleVisibility()
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
