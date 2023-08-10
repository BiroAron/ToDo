<template>
  <input
    v-model="localTitle"
    class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none h-full"
    type="text"
    placeholder="Title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
}
const props = defineProps<Props>()

const localTitle = computed({
  get: () => props.title,
  set: (newTitle) => emit('updateTitle', newTitle)
})

const emit = defineEmits<{
  (e: 'updateTitle', title: string): void
}>()
</script>
