<template>
  <div>
    <input type="text" placeholder="ToDo" v-model="todoInput" />
    <button @click="addItem">Add</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'ToDoAdd',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const todoInput = ref('')

    function addItem() {
      const newItem = todoInput.value
      if (newItem !== '') {
        props.items.push(newItem)
        todoInput.value = ''
      }
    }

    return {
      todoInput,
      addItem
    }
  }
}
</script>