<template>
    <div class="input">
        <div>
            <input id="addItemInput" type="text" placeholder="Title" v-model="todoInput" />
            <select id="addPriorityInput" v-model="priorityInput">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    
        <textarea id="addItemDescrition" type="text" placeholder="Description" v-model="todoDescription"></textarea>

        <button id="addItem" @click="addItem()">Add</button>
    </div>

</template>
  
<script setup lang="ts">
    import { ref } from 'vue'

    const todoInput = ref('')
    const priorityInput = ref('low')
    const todoDescription = ref('')

    function addItem() {
         const newTodo = {
             title: todoInput.value,
             priority: priorityInput.value,
             text: todoDescription.value,
         }
         if (newTodo.title !== '') {
             emit('addTodo', newTodo)
             todoInput.value = ''
             priorityInput.value = 'low'
             todoDescription.value = ''
         }
     }

    const emit = defineEmits(['addTodo']);
</script>