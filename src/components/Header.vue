<template>
  <header class="pt-20 flex justify-between items-center pb-10">
    <div class="font-semibold text-6xl flex justify-center items-center">
    To do list
    </div>
    <div class="w-16 h-16 left-72 top-10 rounded-full outline-none border-none bg-green-500 flex justify-center items-center cursor-pointer">
      <button @click="toggleVisibility">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-12 h-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">

function toggleVisibility(){
    emit('toggleVisibility');
}

const emit = defineEmits<{(e:'toggleVisibility'):void}>();

</script>