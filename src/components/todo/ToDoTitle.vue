<template>
  <input
    :value="title"
    @input="handleInput"
    class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
    type="text"
    placeholder="Title"
  />
</template>

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateTitle', title: string): void
}>()

function handleInput(event: Event) {
  const newTitle = (event.target as HTMLInputElement).value
  emit('updateTitle', newTitle)
}
</script>
