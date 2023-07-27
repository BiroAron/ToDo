<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <ToDoItem :todo="todo" :index="index" @delete-item="deleteItem(index)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Todo } from '../types/Todo'
import ToDoItem from './ToDoItem.vue'

interface Props {
  todos: Todo[]
}
defineProps<Props>()

const emit = defineEmits<{ (e: 'deleteItem', index: number): void }>()

function deleteItem(index: number) {
  emit('deleteItem', index)
}
</script>
