<template>
  <textarea
    :value="description"
    @input="handleInput"
    class="w-full p-2 mt-1 flex placeholder-gray-500 font-semibold focus:outline-none"
    type="text"
    placeholder="Description"
  ></textarea>
</template>

<script setup lang="ts">
interface Props {
  description: string
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateDescription', title: string): void
}>()

function handleInput(event: Event) {
  const newDescription = (event.target as HTMLInputElement).value
  emit('updateDescription', newDescription)
}
</script>
