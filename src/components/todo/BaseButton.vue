<template>
  <button
    class="py-2 px-8 mr-2 rounded-xl font-semibold flex justify-center align-center phone:text-sm phone:px-6 phone:py-1"
    :class="buttonstyles"
  >
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonName: string
  buttonstyles: string
}
defineProps<Props>()
</script>
