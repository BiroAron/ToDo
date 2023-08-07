<template>
  <div
    class="w-full px-3 py-3 flex items-center justify-between rounded-xl border border-black border-2 mb-6 font-semibold"
  >
    <div class="flex felx-row items-center justify-center">
      <SearchIcon class="min-w-custom" />
      <input
        type="text"
        v-model="searchQuery"
        class="flex-1 px-2 py-1 focus:outline-none w-full"
        placeholder="Search Todo"
        @input="filterTodos"
      />
    </div>
    <button class="bg-black text-white px-3 py-1 rounded-lg">Search</button>
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
