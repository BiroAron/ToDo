<template>
  <div class="w-100 h-100 p-5 rounded-md">
    <div>
      <input
        type="text"
        placeholder="Title"
        v-model="newTodo.title"
        class="border p-2 rounded-md"
      />
      <select class="border p-2 rounded-md" v-model="newTodo.priority">
        <option class="bg-low" value="low">Low</option>
        <option class="medium" value="medium">Medium</option>
        <option class="high" value="high">High</option>
      </select>
    </div>
    <div>
      <textarea
        type="text"
        placeholder="Description"
        v-model="newTodo.text"
      ></textarea>
    </div>
    <div class="flex justify-start align-center">
      <button
        class="bg-green-500 py-2 px-8 mx-1 rounded-xl"
        id="addItem"
        @click="addItem()"
      >
        Save
      </button>
      <button
        class="bg-gray-300 py-2 px-7 mx-1 rounded-xl"
        id="addItem"
        @click="emptyForm()"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Todo } from './types'

const emit = defineEmits<{ (e: 'addTodo', newTodo: Todo): void }>()

const newTodo = reactive<Todo>({
  title: '',
  priority: 'low',
  text: ''
})

function addItem() {
  if (newTodo.title !== '') {
    emit('addTodo', newTodo)
    newTodo.title = ''
    newTodo.text = ''
    newTodo.priority = 'low'
  }
}

function emptyForm() {
  newTodo.title = ''
  newTodo.text = ''
  newTodo.priority = 'low'
}
</script>
