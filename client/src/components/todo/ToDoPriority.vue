<template>
  <div class="relative w-24 phone:hidden">
    <div
      class="mb-0 flex cursor-pointer justify-center rounded-full px-8 py-1 font-semibold text-white"
      :class="priorityColorChange(todo.priority)"
      @click="toggleDropdown"
    >
      {{ localTodo.priority }}
    </div>
    <ul
      v-if="isDropdownOpen"
      class="absolute right-0 mr-2 mt-2 rounded-xl border-2 border-black bg-white font-medium"
    >
      <div class="flex flex-col items-start">
        <li v-for="priorityOption in priorityOptions" :key="priorityOption">
          <p
            class="block cursor-pointer px-3 text-black"
            @click="updatePriority(priorityOption, index)"
          >
            {{ priorityOption }}
          </p>
        </li>
      </div>
    </ul>
  </div>
  <div class="flex items-center justify-center space-x-2 desktop:hidden">
    <div
      v-for="priorityOption in priorityOptions"
      :key="priorityOption"
      class="rounded-full p-2 font-semibold text-black"
      :class="[
        priorityColorChange(priorityOption),
        priorityBorderChange(priorityOption)
      ]"
      @click="updatePriorityMobile(priorityOption, index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Todo, TodoPriority } from '../../types/Todo'
import { ColorMap } from '../../types/ColorMap'
interface Props {
  todo: Todo
  index: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updatePriority', priority: TodoPriority, index: number): void
}>()

const priorityOptions: TodoPriority[] = ['Low', 'Medium', 'High']

const colorMap: ColorMap = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const localTodo = reactive(props.todo)
const isDropdownOpen = ref(false)

function priorityColorChange(priority: TodoPriority) {
  return colorMap[priority]
}

function priorityBorderChange(priority: TodoPriority) {
  if (priority === localTodo.priority) return 'border border-black border-1'
  return 'border-none'
}

function updatePriority(priority: TodoPriority, index: number) {
  localTodo.priority = priority
  emit('updatePriority', priority, index)
  toggleDropdown()
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function updatePriorityMobile(priority: TodoPriority, index: number) {
  localTodo.priority = priority
  emit('updatePriority', priority, index)
  isDropdownOpen.value = false
}
</script>
