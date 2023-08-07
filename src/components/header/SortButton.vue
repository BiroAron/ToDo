<template>
  <button class="bg-gray-300 px-2 rounded-md font-semibold">
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonName: string
}
defineProps<Props>()
</script>
