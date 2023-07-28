<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <ToDoItem
        :todo="todo"
        :index="index"
        @delete-item="deleteItem(index)"
        @modify-todo="modifyTodo(todo, index)"
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

const emit = defineEmits<{
  (e: 'deleteItem', index: number): void
  (e: 'modifyTodo', todo: Todo, index: number): void
}>()

function modifyTodo(todo: Todo, index: number) {
  //console.log(todo.text + ' ' + index)
  emit('modifyTodo', todo, index)
}

function deleteItem(index: number) {
  emit('deleteItem', index)
}
</script>
