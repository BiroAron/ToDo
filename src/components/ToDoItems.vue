<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <div
        class="w-full h-full p-3 rounded-xl font-custom border border-black border-2 phone:flex phone:flex-row-reverse phone:space-x-3 phone:justify-between"
      >
        <div class="flex justify-between w-full phone:pl-5">
          <div
            class="mr-2 text-3xl flex w-full font-semibold placeholder-black flex items-center"
          >
            {{ todo.title }}
          </div>
          <div class="flex justify-center">
            <div
              class="flex mb-4 px-6 py-0.5 rounded-3xl font-semibold text-white phone:hidden"
              :class="updatePriorityClass(todo.priority)"
            >
              {{ todo.priority }}
            </div>
          </div>
          <div class="flex justify-center align-center">
            <div
              class="flex p-2 my-3 rounded-3xl font-semibold text-white desktop:hidden"
              :class="updatePriorityClass(todo.priority)"
            ></div>
          </div>
        </div>
        <div class="flex justify-between">
          <div
            class="w-full mt-5 flex text-gray-500 font-semibold text-xl phone:hidden"
          >
            {{ todo.text }}
          </div>
          <div class="flex justify-center items-end phone:items-center">
            <div
              class="w-8 h-8 rounded-full border-4 border-black relative"
              :class="getCheckButtonCircleColor(todo)"
              @click="toggleTaskState(todo)"
            >
              <CheckedIcon
                class="absolute bottom-0 left-0"
                :class="getChecIconVisisbility(todo)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center align-center">
        <button @click="deleteItem(index)">Remove</button>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Todo } from '../types/Todo'
import CheckedIcon from './CheckedIcon.vue'

interface Props {
  todos: Todo[]
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'deleteItem', index: number): void }>()

const colorMap: Record<string, string> = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

function getChecIconVisisbility(todo: Todo) {
  return todo.isChecked ? 'block' : 'hidden'
}

function getCheckButtonCircleColor(todo: Todo) {
  return todo.isChecked ? 'border-green-500' : 'border-black'
}

function updatePriorityClass(priority: string) {
  return colorMap[priority] || 'bg-low'
}

function toggleTaskState(todo: Todo) {
  todo.isChecked = !todo.isChecked
}

function deleteItem(index: number) {
  emit('deleteItem', index)
}
</script>
