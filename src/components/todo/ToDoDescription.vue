<template>
  <div class="flex flex-col phone:text-sm">
    <textarea
      v-model="localDescription"
      class="w-full pt-2 mt-1 resize-none placeholder-gray-500 font-semibold focus:outline-none max-h-28"
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
  (e: 'updateDescription', title: string): void
}>()

const localDescription = computed({
  get: () => props.description,
  set: (newDescription) => emit('updateDescription', newDescription)
})
</script>
