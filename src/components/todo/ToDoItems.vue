<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <ToDoItem
        :todo="todo"
        :index="index"
        @delete-item="deleteItem(index)"
        @update-todo-priority="updateTodoPriority"
        @update-item-list="updateItemList(index)"
        @toggle-task-state="toggleTaskState"
        @edit-todo="editTodo"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue'
import { Todo, TodoPriority } from '../../types/Todo'

interface Props {
  todos: Todo[]
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateTodoPriority', priority: TodoPriority, index: number): void
  (e: 'toggleTaskState', index: number): void
  (e: 'deleteItem', index: number): void
  (e: 'editTodo', todo: Todo, index: number): void
  (e: 'updateItemList', index: number): void
}>()

function toggleTaskState(index: number) {
  emit('toggleTaskState', index)
}

function updateTodoPriority(priority: TodoPriority, index: number) {
  emit('updateTodoPriority', priority, index)
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
