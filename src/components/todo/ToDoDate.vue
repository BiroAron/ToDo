<template>
  <input
    class="flex w-32 text-gray-500 font-semibold placeholder-black focus:outline-none"
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

const parsedDate = new Date(props.date)
parsedDate.setDate(parsedDate.getDate() + 1)

const formattedDate = computed<string>(() =>
  parsedDate.toISOString().slice(0, 10)
)

const localDate = computed({
  get: () => formattedDate,
  set: (newDate) => emit('updateDate', newDate.value)
})

const emit = defineEmits<{
  (e: 'updateDate', date: string): void
}>()
</script>
