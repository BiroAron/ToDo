<template>
  <div class="mb-2 flex flex-col">
    <label class="mb-1 block text-black">{{ inputName }}</label>
    <input
      v-model="email"
      class="w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
      :type="inputType"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  inputName: string
  inputType: string
  inputValue: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateValue', email: string, name: string): void
}>()

const email = computed({
  get: () => props.inputValue,
  set: (newDescription) => emit('updateValue', newDescription, props.inputName)
})
</script>
