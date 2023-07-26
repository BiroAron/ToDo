<template>
  <div class="w-full h-full p-5 rounded-md font-custom">
    <div class="flex justify-between">
      <div class="mr-2">
        <input
          type="text"
          placeholder="Title"
          v-model="newTodo.title"
          class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
        />
      </div>
      <div class="flex justify-center items-center">
        <select
          class="border bg-gray-300 py-1 px-5 rounded-3xl focus:outline-none"
          v-model="newTodo.priority"
          :class="updatePriorityClass"
        >
          <option class="bg-low" value="low">Low</option>
          <option class="bg-medium" value="medium">Medium</option>
          <option class="bg-high" value="high">High</option>
        </select>
      </div>
    </div>
    <div>
      <div>
        <textarea
          class="w-full p-2 mt-5 flex placeholder-gray-500 font-semibold focus:outline-none"
          type="text"
          placeholder="Description"
          v-model="newTodo.text"
        ></textarea>
      </div>
    </div>
    <div class="flex justify-start align-center mt-4">
      <button
        class="bg-green-500 py-2 px-8 mr-2 rounded-xl font-semibold text-white flex justify-center align-center"
        @click="addItem()"
      >
        Save
      </button>
      <button
        class="bg-gray-300 py-2 px-7 rounded-xl font-semibold text-black flex justify-center align-center"
        @click="emptyForm()"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Todo } from './types'

const updatePriorityClass = computed(() => ({
  'bg-low': newTodo.priority === 'low',
  'bg-medium': newTodo.priority === 'medium',
  'bg-high': newTodo.priority === 'high'
}))

const emit = defineEmits<{ (e: 'addTodo', newTodo: Todo): void }>()

const newTodo = reactive<Todo>({
  title: '',
  priority: 'low',
  text: ''
})

function addItem() {
  if (newTodo.title !== '') {
    emit('addTodo', newTodo)
    emptyForm()
  }
}

function emptyForm() {
  newTodo.title = ''
  newTodo.text = ''
  newTodo.priority = 'low'
}
</script>
