<template>
  <header class="flex items-center justify-between pb-12 pt-4">
    <div
      class="flex items-center justify-center text-6xl font-semibold phone:text-5xl"
    >
      To do list
    </div>
    <button
      class="left-72 top-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-primary outline-none phone:h-10 phone:w-10"
      @click="toggleNewTodo"
    >
      <PlusIcon />
    </button>
  </header>
</template>

<script setup lang="ts">
import PlusIcon from '../icons/PlusIcon.vue'

const emit = defineEmits(['toggleNewTodo'])

function toggleNewTodo() {
  emit('toggleNewTodo')
}
</script>
