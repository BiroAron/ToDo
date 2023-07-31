<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <ToDoItem
        :todo="todo"
        :index="index"
        @delete-item="deleteItem(todos, index)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import ToDoItem from './ToDoItem.vue'
import { Todo } from '../../types/Todo'

interface Props {
  todos: Todo[]
}
defineProps<Props>()

function deleteItem(todos: Todo[], index: number) {
  todos.splice(index, 1)
}
</script>
