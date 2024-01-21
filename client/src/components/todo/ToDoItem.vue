<template>
  <div
    class="h-full w-full transform rounded-xl border-2 border-black p-3 duration-300 ease-out hover:scale-105 phone:flex phone:flex-row-reverse phone:justify-between phone:space-x-3"
    :class="getTodoElementVisibility"
    @click="toggleEdit"
  >
    <div class="flex w-full justify-between phone:pl-5">
      <div class="flex w-full flex-col">
        <div
          class="mr-2 flex w-full items-center text-3xl font-semibold placeholder-black phone:text-2xl"
        >
          {{ todo.title }}
        </div>
        <div
          class="flex-column flex items-center text-sm font-semibold text-gray-500"
        >
          <CalendarIcon class="mr-1" />
          <div class="pt-1">
            {{ formatDateToString(todo.date).replace(/-/g, '.') }}
          </div>
        </div>
      </div>
      <div class="flex items-start justify-center">
        <div
          class="align-center flex w-24 justify-center rounded-3xl py-0.5 font-semibold text-white phone:hidden"
          :class="priorityColor(todo.priority)"
        >
          {{ todo.priority }}
        </div>
      </div>
      <div class="flex items-center">
        <div
          class="flex rounded-3xl p-2 font-semibold text-black desktop:hidden"
          :class="priorityColor(todo.priority)"
        ></div>
      </div>
    </div>
    <div class="flex justify-between">
      <div
        class="mt-3 flex w-full text-xl font-semibold text-gray-500 phone:hidden"
      >
        {{ todo.description }}
      </div>
      <div class="flex items-end justify-center phone:items-center">
        <div
          class="relative h-8 w-8 rounded-full border-4 border-black"
          :class="getCheckButtonCircleColor(todo)"
          @click="toggleTaskState(index)"
        >
          <CheckedIcon v-if="todo.isChecked" class="absolute bottom-0 left-0" />
        </div>
      </div>
    </div>
  </div>

  <ToDoForm
    class="transform duration-300 ease-out hover:scale-105"
    v-if="isEditingTodoVisible"
    :todo="todo"
    :index="index"
    @delete-item="deleteItem(todo._id)"
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
import { formatDateToString } from '../../helpers/dateformatting'

interface Props {
  todo: Todo
  index: number
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleteItem', _id: string): void
  (e: 'editTodo', todo: Todo): void
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

function toggleTaskState(index: number) {
  emit('toggleTaskState', index)
  updateItemList(index)
  toggleEdit()
}

function deleteItem(_id: string) {
  emit('deleteItem', _id)
}

function editTodo(todo: Todo) {
  emit('editTodo', todo)
}

function updateItemList(index: number) {
  emit('updateItemList', index)
}
</script>
