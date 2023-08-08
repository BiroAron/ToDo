<template>
  <div class="flex phone:flex-col">
    <div class="flex align-center items-center space-x-2">
      <SortButton
        class="flex-grow p-2"
        v-for="(button, index) in sortButtons"
        :key="index"
        :class="buttonClasses(button)"
        :button-name="button.name"
        @click="sortFilteredTodos(button.sortCriteria)"
      ></SortButton>
    </div>
    <div
      class="flex items-center desktop:justify-end phone:justify-start phone:mt-2 w-full"
    >
      <ArrowButton
        :sort-ascending="sortAscending"
        @click="toggleSortOrder"
      ></ArrowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ArrowButton from './ArrowButton.vue'
import SortButton from './SortButton.vue'

interface Props {
  activeButton: string
  sortAscending: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'sortFilteredTodos', sortCriteria: string): void
  (e: 'toggleSortOrder'): void
}>()

const activeortButtonColor = computed(() =>
  props.sortAscending
    ? 'bg-black text-white'
    : 'bg-primary text-white border-primary'
)

const sortButtons = [
  { name: 'Title', sortCriteria: 'title' },
  { name: 'Description', sortCriteria: 'description' },
  { name: 'Date', sortCriteria: 'date' },
  { name: 'Priority', sortCriteria: 'priority' }
]

function sortFilteredTodos(sortCriteria: string) {
  emit('sortFilteredTodos', sortCriteria)
}

function toggleSortOrder() {
  emit('toggleSortOrder')
}

const activeButton = computed(() => props.activeButton)

function buttonClasses(button: { name: string; sortCriteria: string }) {
  return activeButton.value === button.sortCriteria
    ? activeortButtonColor.value
    : 'bg-white'
}
</script>
