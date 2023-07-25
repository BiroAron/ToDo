<template>
    <div class="input">
        <div>
            <input id="addItemInput" type="text" placeholder="Title" v-model="newTodo.title" class="border p-2 rounded-md"/>
            <select class="border p-2 rounded-md" id="addPriorityInput" v-model="newTodo.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div>
            <textarea id="addItemDescription" type="text" placeholder="Description" v-model="newTodo.text"></textarea>
            <input type="checkbox">
        </div>
    </div>
    <div class="flex justify-center align-center">
        <button class="bg-transparent p-2  rounded-md mb-2" id="addItem" @click="addItem()">Add</button>
    </div>
    

</template>
  
<script setup lang="ts">
    import { reactive } from 'vue'
    import { Todo } from './types';

    const emit = defineEmits<{(e:'addTodo', newTodo: Todo):void}>();

    const newTodo = reactive<Todo>({
        title: '',
        priority: 'low',
        text: ''
    });

    function addItem() {
         if (newTodo.title !== '') {
            emit('addTodo', newTodo);
            console.log(newTodo.priority);
            newTodo.title = '';
            newTodo.text = '';
            newTodo.priority = 'low';
            };
         }
    
</script>