<template>
  <div
    class="fixed inset-0 flex items-start justify-center backdrop-blur-sm backdrop-filter bg-black bg-opacity-60"
  >
    <div class="bg-white p-4 rounded-xl shadow-md mt-20p font-medium">
      <!-- Your popup content goes here -->
      <p class="text-center">Do you want to delete this element?</p>
      <div class="flex justify-center mt-4">
        <button
          class="bg-gray-500 text-white px-4 mr-1 py-2 rounded"
          @click="closePopup"
        >
          Close
        </button>
        <button
          class="bg-red-500 text-white px-4 ml-1 py-2 rounded"
          @click="deleItem(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  index: number
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleteItem', index: number): void
  (e: 'closePopup'): void
}>()

function deleItem(index: number) {
  emit('deleteItem', index)
}

function closePopup() {
  emit('closePopup')
}
</script>
