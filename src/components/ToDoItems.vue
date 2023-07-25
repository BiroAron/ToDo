<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo.title }} - {{ todo.text }} - {{ todo.priority }}
      <button @click="deleteItem(index)">Remove</button>
    </li>
  </ul>
</template>

<script setup lang='ts'>

  defineProps(['todos']);
  const emit = defineEmits<{(e:'deleteItem', index: number):void}>();

  function deleteItem(index:number){
    emit('deleteItem', index);
  }

</script>