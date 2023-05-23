<template>
    <div>
      <div id="clear">
        <button @click="clear">Clear</button>
      </div>
      <AddItem :items="items" />
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }} <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import AddItem from './ToDoAdd.vue'
  
  export default {
    name: 'ToDoList',
    components: {
      AddItem
    },
    setup() {
      const items = ref([])
  
      function removeItem(index:number) {
        items.value.splice(index, 1)
      }
  
      function clear() {
        items.value.splice(0)
      }
  
      return {
        items,
        removeItem,
        clear
      }
    }
  }
  </script>