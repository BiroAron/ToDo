<template>
  <button
    class="px-2 py-1 rounded-md font-semibold border border-black text-sm"
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
