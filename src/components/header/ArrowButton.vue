<template>
  <button
    class="flex items-center rounded-md px-2 py-1 font-semibold"
    :class="buttonColor"
  >
    <DownArrowIcon v-if="buttonColor === 'bg-black'"></DownArrowIcon>
    <UpArrowIcon v-if="buttonColor === 'bg-primary'"></UpArrowIcon>
  </button>
</template>

<script setup lang="ts">
import DownArrowIcon from '../icons/DownArrowIcon.vue'
import UpArrowIcon from '../icons/UpArrowIcon.vue'

interface Props {
  buttonColor: string
}
defineProps<Props>()
</script>
