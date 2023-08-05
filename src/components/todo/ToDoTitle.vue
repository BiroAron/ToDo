<template>
  <input
    v-model="localTitle"
    class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
    type="text"
    placeholder="Title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  description: string
}
const props = defineProps<Props>()

const localTitle = computed({
  get: () => props.description,
  set: (newTitle) => emit('updateTitle', newTitle)
})

const emit = defineEmits<{
  (e: 'updateTitle', title: string): void
}>()
</script>
