<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo.title }} - {{ todo.text }} - {{ todo.priority }}
      <button @click="deleteItem(index)">Remove</button>
    </li>
  </ul>
</template>

<script setup lang='ts'>

  const props = defineProps(['todos']);
  console.log(props)
  console.log(typeof(props))
  function deleteItem(index:number){
    emit('deleteItem', index);
  }
  const emit = defineEmits<{(e:'deleteItem', index: number):void}>();
</script>