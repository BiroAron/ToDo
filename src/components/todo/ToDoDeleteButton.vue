<template>
  <button
    class="bg-gray-300 py-2 px-7 rounded-xl font-semibold text-black flex justify-center align-center"
    @click="changePopupState"
  >
    Delete
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['changePopupState'])

function changePopupState() {
  emit('changePopupState')
}
</script>
