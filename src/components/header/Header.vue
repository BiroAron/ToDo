<template>
  <header class="pt-16 flex justify-between items-center pb-12">
    <div
      class="font-semibold text-6xl phone:text-5xl flex justify-center items-center"
    >
      To do list
    </div>
    <button
      class="w-12 h-12 phone:w-10 phone:h-10 left-72 top-10 rounded-full outline-none border-none bg-primary flex justify-center items-center cursor-pointer"
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
