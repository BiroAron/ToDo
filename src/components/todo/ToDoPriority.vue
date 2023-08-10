<template>
  <div class="relative w-24 phone:hidden">
    <div
      class="flex cursor-pointer mb-0 px-8 py-1 justify-center rounded-full font-semibold text-white"
      :class="priorityColorChange(todo.priority)"
      @click="toggleDropdown"
    >
      {{ localTodo.priority }}
    </div>
    <ul
      v-if="isDropdownOpen"
      class="absolute bg-white mt-2 mr-2 rounded-xl font-medium border-black border-2 right-0"
    >
      <div class="flex flex-col items-start">
        <li v-for="priorityOption in priorityOptions" :key="priorityOption">
          <p
            class="block px-3 text-black cursor-pointer"
            @click="updatePriority(priorityOption, index)"
          >
            {{ priorityOption }}
          </p>
        </li>
      </div>
    </ul>
  </div>
  <div class="flex justify-center items-center space-x-2 desktop:hidden">
    <div
      v-for="priorityOption in priorityOptions"
      :key="priorityOption"
      class="p-2 rounded-full font-semibold text-black"
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
