<template>
  <textarea
    v-model="localDescription"
    class="w-full pt-2 mt-1 flex placeholder-gray-500 font-semibold focus:outline-none"
    type="text"
    placeholder="Description"
  ></textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  description: string
}
const props = defineProps<Props>()

const localDescription = computed({
  get: () => props.description,
  set: (newDescription) => emit('updateDescription', newDescription)
})

const emit = defineEmits<{
  (e: 'updateDescription', title: string): void
}>()
</script>
