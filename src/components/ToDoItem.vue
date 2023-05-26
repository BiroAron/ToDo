<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo.title }} - {{ todo.text }} - {{ todo.priority }}
      <button @click="deleteItem(todo)">Remove</button>
    </li>
  </ul>
</template>

<script setup lang='ts'>
  defineProps(['todos']);

  function deleteItem(todo: {index:number}){
    emit('deleteItem', todo)
  }

  const emit = defineEmits(['deleteItem']);
</script>