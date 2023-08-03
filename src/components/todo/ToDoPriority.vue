<template>
  <div class="relative w-30 phone:hidden">
    <div
      class="flex cursor-pointer mb-0 px-8 py-1 justify-center my-3 rounded-full font-semibold text-white"
      :class="priorityColorChange(todo.priority)"
      @click="toggleDropdown"
    >
      {{ localTodo.priority }}
    </div>
    <ul
      class="absolute bg-white mt-2 mr-2 rounded-xl font-medium border border-black border-2 right-0"
      :class="getDropdownState"
    >
      <div class="flex flex-col items-start">
        <li>
          <p
            class="block px-3 text-black cursor-pointer"
            @click="updatePriority(priority.Low, index)"
          >
            Low
          </p>
        </li>
        <li>
          <p
            class="block px-3 text-black cursor-pointer"
            @click="updatePriority(priority.Medium, index)"
          >
            Medium
          </p>
        </li>
        <li>
          <p
            class="block px-3 text-black cursor-pointer"
            @click="updatePriority(priority.High, index)"
          >
            High
          </p>
        </li>
      </div>
    </ul>
  </div>
  <div class="flex justify-center space-x-2 desktop:hidden">
    <div
      class="p-2 my-3 rounded-full font-semibold text-black bg-low h-5 w-5"
      :class="priorityBorderChange(priority.Low)"
      @click="updatePriorityMobile(priority.Low, index)"
    ></div>
    <div
      class="p-2 my-3 rounded-full font-semibold text-black bg-medium h-5 w-5"
      :class="priorityBorderChange(priority.Medium)"
      @click="updatePriorityMobile(priority.Medium, index)"
    ></div>
    <div
      class="p-2 my-3 rounded-full font-semibold text-black bg-high h-5 w-5"
      :class="priorityBorderChange(priority.High)"
      @click="updatePriorityMobile(priority.High, index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, ref } from 'vue'
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

const colorMap: ColorMap = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const priority: Record<TodoPriority, TodoPriority> = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High'
}
const localTodo = toRef(props, 'todo')
const isDropdownOpen = ref(false)

const getDropdownState = computed(() =>
  isDropdownOpen.value ? 'block' : 'hidden'
)

function priorityColorChange(priority: TodoPriority) {
  return colorMap[priority]
}

function priorityBorderChange(priority: TodoPriority) {
  if (priority === props.todo.priority) return 'border border-black border-2'
  else return 'border-none'
}

function updatePriority(priority: TodoPriority, index: number) {
  localTodo.value.priority = priority
  emit('updatePriority', priority, index)
  toggleDropdown()
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function updatePriorityMobile(priority: TodoPriority, index: number) {
  emit('updatePriority', priority, index)
  isDropdownOpen.value = false
}
</script>
