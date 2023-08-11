<template>
  <input
    class="flex w-32 font-semibold text-gray-500 placeholder-black focus:outline-none phone:text-sm"
    type="date"
    v-model="localDate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  date: string
}
const props = defineProps<Props>()

const localDate = computed({
  get: () => props.date,
  set: (newDate) => emit('updateDate', newDate)
})

const emit = defineEmits<{
  (e: 'updateDate', date: string): void
}>()
</script>
