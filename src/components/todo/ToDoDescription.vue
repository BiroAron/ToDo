<template>
  <textarea
    v-model="localTodo.text"
    class="w-full p-2 mt-1 flex placeholder-gray-500 font-semibold focus:outline-none"
    type="text"
    placeholder="Description"
  ></textarea>
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
