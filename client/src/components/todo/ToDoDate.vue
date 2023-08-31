<template>
  <input
    class="flex w-32 font-semibold text-gray-500 placeholder-black focus:outline-none phone:text-sm"
    type="date"
    v-model="localDate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  formatDateToString,
  formatStringToDate
} from '../../helpers/dateformatting'

interface Props {
  date: Date
}
const props = defineProps<Props>()

const localDate = computed({
  get: () => formatDateToString(props.date),
  set: (newDate) => emit('updateDate', formatStringToDate(newDate))
})

const emit = defineEmits<{
  (e: 'updateDate', date: Date): void
}>()
</script>
