<template>
  <div class="flex phone:flex-col">
    <div class="align-center flex items-center space-x-2">
      <SortButton
        class="flex-grow p-2"
        v-for="(button, index) in sortButtons"
        :key="index"
        :class="buttonClasses(button)"
        :button-name="button.name"
        @click="sortTodos(button.sortCriteria)"
      ></SortButton>
    </div>
    <div
      class="flex w-full items-center desktop:justify-end phone:mt-2 phone:justify-start"
    >
      <ArrowButton
        button-color="bg-black"
        @click="setSortOrderAscending"
      ></ArrowButton>
      <ArrowButton
        class="ml-2"
        button-color="bg-primary"
        @click="setSortOrderDescending"
      >
      </ArrowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ArrowButton from './ArrowButton.vue'
import SortButton from './FilterButton.vue'

interface Props {
  activeButton: string
  sortAscending: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'sortTodos', sortCriteria: string): void
  (e: 'setSortOrderAscending'): void
  (e: 'setSortOrderDescending'): void
}>()

const activeButton = computed(() => props.activeButton)

const activetButtonColor = computed(() =>
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

function sortTodos(sortCriteria: string) {
  emit('sortTodos', sortCriteria)
}

function setSortOrderAscending() {
  emit('setSortOrderAscending')
}

function setSortOrderDescending() {
  emit('setSortOrderDescending')
}

function buttonClasses(button: { name: string; sortCriteria: string }) {
  return activeButton.value === button.sortCriteria
    ? activetButtonColor.value
    : 'bg-white'
}
</script>
