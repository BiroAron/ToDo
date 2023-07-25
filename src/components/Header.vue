<template>
  <header class="pt-16 flex justify-between items-center pb-10">
    <div class="font-semibold text-6xl flex justify-center items-center">
    To do list
    </div>
    <div class="w-16 h-16 left-72 top-10 rounded-full outline-none border-none bg-green-500 flex justify-center items-center cursor-pointer">
      <button @click="toggleVisibility">
        <PlusIcon/>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import PlusIcon from './PlusIcon.vue';


  const emit = defineEmits<{(e:'toggleVisibility'):void}>();

  function toggleVisibility(){
      emit('toggleVisibility');
  }

</script>