<template>
  <div class="flex phone:flex-col">
    <div class="flex align-center items-center space-x-2">
      <SortButton
        class="flex-grow p-2"
        button-name="Title"
        @click="sortFilteredTodos('title')"
      ></SortButton>
      <SortButton
        class="flex-grow p-2"
        button-name="Description"
        @click="sortFilteredTodos('description')"
      ></SortButton>
      <SortButton
        class="flex-grow p-2"
        button-name="Date"
        @click="sortFilteredTodos('date')"
      ></SortButton>
      <SortButton
        class="flex-grow p-2"
        button-name="Priority"
        @click="sortFilteredTodos('priority')"
      ></SortButton>
    </div>
    <div
      class="flex items-center desktop:justify-end phone:sutify-start phone:mt-2 w-full"
    >
      <ArrowButton @click="toggleSortOrder()"></ArrowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowButton from './ArrowButton.vue'
import SortButton from './SortButton.vue'

const emit = defineEmits<{
  (e: 'sortFilteredTodos', sortCriteria: string): void
  (e: 'toggleSortOrder'): void
}>()

function sortFilteredTodos(sortCriteria: string) {
  emit('sortFilteredTodos', sortCriteria)
}

function toggleSortOrder() {
  emit('toggleSortOrder')
}
</script>
