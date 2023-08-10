<template>
  <div
    class="mb-6 flex w-full items-center justify-between rounded-xl border-2 border-black px-3 py-3 font-semibold"
  >
    <div class="felx-row flex items-center justify-center">
      <SearchIcon class="min-w-custom" />
      <input
        class="w-full flex-1 px-2 py-1 focus:outline-none phone:text-sm"
        type="text"
        v-model="searchQuery"
        placeholder="Search Todo"
        @input="filterTodos"
      />
    </div>
    <button
      class="rounded-lg bg-black px-3 py-1 text-white phone:px-2 phone:text-sm"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from '../icons/SearchIcon.vue'

const emit = defineEmits<{
  (e: 'setSearchQuery', searchQuery: string): void
}>()

const searchQuery = ref('')

function filterTodos() {
  emit('setSearchQuery', searchQuery.value)
}
</script>
