<template>
  <button
    class="rounded-md border border-black px-2 py-1 text-sm font-semibold"
  >
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonName: string
}
defineProps<Props>()
</script>
