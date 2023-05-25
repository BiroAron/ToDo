<script setup lang="ts">
    import { ref } from 'vue'

    var items = ref([])
    const todoInput = ref('')

    function addItem(){
        const newItem = todoInput.value
        if(newItem != '')
        items.value.push(newItem)
        todoInput.value = ''
    }

    function removeItem(index){
        items.value.splice(index, 1)
    }

    function clear(){
        items.value.splice(0)
    }

</script>

<template>

    <div id="clear">
        <button @click="clear">Clear</button>
    </div>
    <div>
        <input type = "text" placeholder="ToDo" v-model="todoInput"/>
        <div>
            <button @click="addItem">Add</button>
        </div>
    </div>
    <ul >
        <li v-for="(item, index) in items" :key="index">
        {{ item }} <button @click="removeItem(index)">Remove</button>
        </li>
    </ul>

</template>