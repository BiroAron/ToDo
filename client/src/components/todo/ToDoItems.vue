<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <ToDoItem
        :todo="todo"
        :index="index"
        @delete-item="deleteItem(todo._id)"
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
  (e: 'deleteItem', _id: string): void
  (e: 'editTodo', todo: Todo): void
  (e: 'updateItemList', index: number): void
}>()

function toggleTaskState(index: number) {
  emit('toggleTaskState', index)
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
