<template>
  <div
    class="w-full h-full p-3 rounded-xl border border-black border-2 phone:flex phone:flex-row-reverse phone:space-x-3 phone:justify-between"
    :class="getTodoElementVisibility"
    @click="toggleEdit"
  >
    <div class="flex justify-between w-full phone:pl-5">
      <div class="flex flex-col w-full">
        <div
          class="mr-2 text-3xl flex w-full font-semibold placeholder-black flex items-center"
        >
          {{ todo.title }}
        </div>
        <div
          class="text-gray-500 font-semibold text-sm flex flex-column items-center"
        >
          <CalendarIcon class="mr-1" />
          <div class="pt-1">
            {{ formatDate(todo.date) }}
          </div>
        </div>
      </div>
      <div class="flex justify-center items-start">
        <div
          class="flex align-center w-24 py-0.5 rounded-3xl font-semibold text-white phone:hidden justify-center"
          :class="priorityColor(todo.priority)"
        >
          {{ todo.priority }}
        </div>
      </div>
      <div class="flex items-center">
        <div
          class="flex p-2 rounded-3xl font-semibold text-black desktop:hidden"
          :class="priorityColor(todo.priority)"
        ></div>
      </div>
    </div>
    <div class="flex justify-between">
      <div
        class="w-full mt-3 flex text-gray-500 font-semibold text-xl phone:hidden"
      >
        {{ todo.description }}
      </div>
      <div class="flex justify-center items-end phone:items-center">
        <div
          class="w-8 h-8 rounded-full border-4 border-black relative"
          :class="getCheckButtonCircleColor(todo)"
          @click="toggleTaskState(index)"
        >
          <CheckedIcon v-if="todo.isChecked" class="absolute bottom-0 left-0" />
        </div>
      </div>
    </div>
  </div>

  <ToDoForm
    v-if="isEditingTodoVisible"
    :todo="todo"
    :index="index"
    @delete-item="deleteItem(index)"
    @edit-todo="editTodo"
    @toggle-edit="toggleEdit"
    @close-edit="closeEdit"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import CheckedIcon from '../icons/CheckedIcon.vue'
import CalendarIcon from '../icons/CalendarIcon.vue'
import ToDoForm from './ToDoForm.vue'
import { Todo, TodoPriority } from '../../types/Todo'
import { ColorMap } from '../../types/ColorMap'

interface Props {
  todo: Todo
  index: number
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleteItem', index: number): void
  (e: 'editTodo', todo: Todo, index: number): void
  (e: 'toggleTaskState', index: number): void
  (e: 'updateItemList', index: number): void
}>()

const colorMap: ColorMap = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const isEditingTodoVisible = ref(false)

const getTodoElementVisibility = computed(() =>
  isEditingTodoVisible.value ? ' hidden phone:hidden ' : 'block'
)

function toggleEdit() {
  isEditingTodoVisible.value = !isEditingTodoVisible.value
}

function closeEdit() {
  isEditingTodoVisible.value = false
}

function getCheckButtonCircleColor(todo: Todo) {
  return todo.isChecked ? 'border-primary' : 'border-black'
}

function priorityColor(priority: TodoPriority) {
  return colorMap[priority]
}

function formatDate(inputDate: string): string {
  const parts = inputDate.split('-')
  const year = parts[0]
  const month = parts[1]
  const day = parts[2]

  return `${day}.${month}.${year}`
}

function toggleTaskState(index: number) {
  emit('toggleTaskState', index)
  updateItemList(index)
  toggleEdit()
}

function deleteItem(index: number) {
  emit('deleteItem', index)
}

function editTodo(todo: Todo, index: number) {
  emit('editTodo', todo, index)
}

function updateItemList(index: number) {
  emit('updateItemList', index)
}
</script>
