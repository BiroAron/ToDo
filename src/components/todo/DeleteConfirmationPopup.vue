<template>
  <div
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 rounded-lg"
  >
    <div class="bg-white p-4 rounded-xl shadow-md mt-16p font-medium mx-10">
      <h1 class="text-center font-semibold text-xl">
        Do you want to delete this element?
      </h1>
      <div class="flex justify-center mt-4 font-semibold">
        <BaseButton
          buttonstyles="bg-gray-300 text-black"
          button-name="Close"
          @click="closePopup"
        ></BaseButton>
        <BaseButton
          buttonstyles="bg-high text-white"
          button-name="Delete"
          @click="deleteItem(index)"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
interface Props {
  index: number
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleteItem', index: number): void
  (e: 'closePopup'): void
}>()

function deleteItem(index: number) {
  emit('deleteItem', index)
}

function closePopup() {
  emit('closePopup')
}
</script>
