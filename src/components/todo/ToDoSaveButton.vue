<template>
  <button
    class="bg-primary py-2 px-8 mr-2 rounded-xl font-semibold text-white flex justify-center align-center"
    @click="handleSaveClick()"
  >
    Save
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['handleSaveClick'])

function handleSaveClick() {
  emit('handleSaveClick')
}
</script>
