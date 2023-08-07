<template>
  <div class="flex phone:flex-col">
    <div class="flex align-center items-center space-x-2">
      <SortButton
        class="flex-grow p-2 bg-gray-300"
        button-name="Title"
      ></SortButton>
      <SortButton
        class="flex-grow p-2 bg-gray-300"
        button-name="Description"
      ></SortButton>
      <SortButton
        class="flex-grow p-2 bg-gray-300"
        button-name="Date"
      ></SortButton>
      <SortButton
        class="flex-grow p-2 bg-gray-300"
        button-name="Priority"
      ></SortButton>
    </div>
    <div
      class="flex items-center desktop:justify-end phone:sutify-start phone:mt-2 w-full"
    >
      <ArrowButton class=""></ArrowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowButton from './ArrowButton.vue'
import SortButton from './SortButton.vue'
</script>
