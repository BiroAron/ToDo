<template>
  <div class="flex flex-col phone:text-sm">
    <textarea
      v-model="localDescription"
      class="mt-1 max-h-28 w-full resize-none pt-2 font-semibold placeholder-gray-500 focus:outline-none"
      type="text"
      placeholder="Description"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  description: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateDescription', description: string): void
}>()

const localDescription = computed({
  get: () => props.description,
  set: (newDescription) => emit('updateDescription', newDescription)
})
</script>
