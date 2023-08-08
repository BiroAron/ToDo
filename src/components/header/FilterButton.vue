<template>
  <button class="px-2 rounded-md font-semibold border border-black">
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonName: string
}
defineProps<Props>()
</script>
