<template>
  <div
    class="fixed inset-0 flex items-start justify-center backdrop-blur-sm bg-black bg-opacity-60"
  >
    <div class="bg-white p-4 rounded-xl shadow-md mt-20p font-medium">
      <p class="text-center font-semibold">
        Do you want to delete this element?
      </p>
      <div class="flex justify-center mt-4 font-semibold">
        <button
          class="bg-secondary text-black px-4 mr-1 py-2 rounded-xl"
          @click="closePopup"
        >
          Close
        </button>
        <button
          class="bg-high text-white px-4 ml-1 py-2 rounded-xl"
          @click="deleteItem(index)"
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

function deleteItem(index: number) {
  emit('deleteItem', index)
}

function closePopup() {
  emit('closePopup')
}
</script>
