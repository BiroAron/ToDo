<template>
  <button
    class="align-center mr-2 flex justify-center rounded-xl px-8 py-2 font-semibold phone:px-6 phone:py-1 phone:text-sm"
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
