<template>
  <div
    class="w-full h-full p-3 rounded-xl border border-black border-2 phone:flex phone:flex-row-reverse phone:space-x-3 phone:justify-between"
    @click="toggleEditVisibility"
    :class="getTodoElementVisibility"
  >
    <div class="flex justify-between w-full phone:pl-5">
      <div
        class="mr-2 text-3xl flex w-full font-semibold placeholder-black flex items-center"
      >
        {{ todo.title }}
      </div>
      <div class="flex justify-center">
        <div
          class="flex mb-4 px-8 py-0.5 rounded-3xl font-semibold text-white phone:hidden"
          :class="priorityColor(todo.priority)"
        >
          {{ todo.priority }}
        </div>
      </div>
      <div class="flex justify-center align-center">
        <div
          class="flex p-2 my-3 rounded-3xl font-semibold text-black desktop:hidden"
          :class="priorityColor(todo.priority)"
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
  <ToDoForm
    :todo="todo"
    :index="index"
    @toggle-edit-visibility="toggleEditVisibility"
    @delete-item="deleteItem(index)"
    :class="getEditModeVisibility"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CheckedIcon from '../icons/CheckedIcon.vue'
import ToDoForm from './ToDoForm.vue'
import { Todo, TodoPriority } from '../../types/Todo'
import { ColorMap } from '../../types/ColorMap'

interface Props {
  todo: Todo
  index: number
}
defineProps<Props>()

const colorMap: ColorMap = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const emit = defineEmits<{
  (e: 'deleteItem', index: number): void
}>()

const editingTodoVisibility = ref(false)

const getEditModeVisibility = computed(() =>
  editingTodoVisibility.value ? 'block' : 'hidden'
)

const getTodoElementVisibility = computed(() =>
  editingTodoVisibility.value ? 'hidden phone:hidden' : 'block'
)

function toggleEditVisibility() {
  editingTodoVisibility.value = !editingTodoVisibility.value
}

function getChecIconVisisbility(todo: Todo) {
  return todo.isChecked ? 'block' : 'hidden phone:hidden'
}

function getCheckButtonCircleColor(todo: Todo) {
  return todo.isChecked ? 'border-green-500' : 'border-black'
}

function priorityColor(priority: TodoPriority) {
  return colorMap[priority]
}

function toggleTaskState(todo: Todo) {
  todo.isChecked = !todo.isChecked
  toggleEditVisibility()
}

function deleteItem(index: number) {
  emit('deleteItem', index)
}
</script>
