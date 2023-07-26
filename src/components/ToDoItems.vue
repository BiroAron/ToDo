<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index" class="mb-3">
      <div
        class="w-full h-full p-3 rounded-md font-custom border border-black border-2"
      >
        <div class="flex justify-between">
          <div
            class="mr-2 text-3xl flex w-full font-semibold placeholder-black"
          >
            {{ todo.title }}
          </div>
          <div
            class="flex justify-center"
            :class="updatePriorityClass(todo.priority)"
          >
            {{ todo.priority }}
          </div>
        </div>
        <div>
          <div class="w-full mt-5 flex text-gray-500 font-semibold">
            {{ todo.text }}
          </div>
          <div></div>
        </div>
      </div>
      <button @click="deleteItem(index)">Remove</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps(['todos'])
const emit = defineEmits<{ (e: 'deleteItem', index: number): void }>()

const updatePriorityClass = (priority: string) => ({
  'bg-low': priority === 'low',
  'bg-medium': priority === 'medium',
  'bg-high': priority === 'high'
})

function deleteItem(index: number) {
  emit('deleteItem', index)
}
</script>
