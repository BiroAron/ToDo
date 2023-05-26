<template>
	<div>
		<!-- <Header @toggle-visibility="toggleVisibility"></Header> -->
		<div :style="{ display: shouldShow ? 'block' : 'none' }">
			<div id="clear">
				<button @click="clear">Clear</button>
			</div>
			<ToDoForm @add-todo="addTodo" />
		</div>
		<ToDoItem :todos="todos" @delete-item="removeItem" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import ToDoForm from './ToDoForm.vue'
	//import Header from './Header.vue'
	import ToDoItem from './ToDoItem.vue'

	interface Todo {
		title: string;
		priority: string;
		text: string;
	}

	const shouldShow = ref(true);

	const todos = ref<Todo[]>([]);

	function addTodo(todo: Todo) {
		todos.value.push(todo);
	}

	function removeItem(index: number) {
		todos.value.splice(index, 1);
	}

	// function toggleVisibility(){
	// 	shouldShow.value = !shouldShow.value;
	// }

	function clear() {
		todos.value.splice(0);
	}
</script>