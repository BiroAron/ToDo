<template>
  <div class="mb-2 flex flex-col">
    <label class="mb-1 block pl-1 text-base font-semibold text-black">{{
      inputName
    }}</label>
    <input
      v-model="value"
      class="w-full rounded-lg border border-black p-2 text-black outline-none focus:bg-gray-300"
      :type="inputType"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  inputName: string
  inputType: string
  modelValue: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', email: string, name: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (newDescription) =>
    emit('update:modelValue', newDescription, props.inputName)
})
</script>
