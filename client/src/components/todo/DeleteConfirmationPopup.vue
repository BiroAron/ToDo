<template>
  <div
    class="fixed inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div class="mt-16p mx-10 rounded-xl bg-white p-4 font-medium shadow-md">
      <h1 class="text-center text-xl font-semibold">
        Do you want to delete this element?
      </h1>
      <div class="mt-4 flex justify-center font-semibold">
        <BaseButton
          buttonstyles="bg-gray-300 text-black"
          button-name="Close"
          @click="closePopup"
        ></BaseButton>
        <BaseButton
          buttonstyles="bg-high text-white"
          button-name="Delete"
          @click="deleteItem(_id)"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
interface Props {
  _id: string
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleteItem', _id: string): void
  (e: 'closePopup'): void
}>()

function deleteItem(_id: string) {
  emit('deleteItem', _id)
}

function closePopup() {
  emit('closePopup')
}
</script>
