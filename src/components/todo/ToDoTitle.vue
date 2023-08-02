<template>
  <input
    v-model="localTodo.title"
    class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
    type="text"
    placeholder="Title"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Todo } from '../../types/Todo'

interface Props {
  todo: Todo
}
const props = defineProps<Props>()

const localTodo = ref(props.todo)
</script>
