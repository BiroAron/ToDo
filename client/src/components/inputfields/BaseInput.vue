<template>
  <label class="mb-1 block text-black">{{ inputName }}</label>
  <input
    class="mb-4 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
    :type="inputType"
  />
</template>

<script setup lang="ts">
interface Props {
  inputName: string
  inputType: string
}
defineProps<Props>()
</script>
