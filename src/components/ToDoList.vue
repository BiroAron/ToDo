<template>
	<div class="w-1/2 mx-auto max-w-xl">
		<div class="px-5">
			<Header @toggle-visibility="toggleVisibility"></Header>
			<div class="flex justify-center align-center">
				<div :style="{ display: shouldShow ? 'block' : 'none' }">
					<div id="clear" class="flex justify-center align-center">
						<button class="bg-transparent p-2 rounded-md mb-2 border border-black " @click="clear">Clear</button>
					</div>
					<ToDoForm @add-todo="addTodo" />
				</div>
			</div>
			<ToDoItem :todos="todos" @delete-item="removeItem" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import ToDoForm from './ToDoForm.vue'
	import Header from './Header.vue'
	import ToDoItem from './ToDoItem.vue'
	import { Todo } from './types';

	const shouldShow = ref(true);

	const todos = ref<Todo[]>([]);

	function addTodo(todo: Todo) {
		todos.value.push(todo);
	}

	function removeItem(index: number) {
		todos.value.splice(index, 1);
	}

	function toggleVisibility(){
		shouldShow.value = !shouldShow.value;
	}

	function clear() {
		todos.value.splice(0);
	}
</script>