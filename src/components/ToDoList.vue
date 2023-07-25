<template>
	<div class="w-1/2 mx-auto max-w-xl">
		<div class="px-5">
			<Header @toggle-visibility="toggleVisibility"></Header>
			<div class="flex justify-center align-center">
				<div :class="isNewElementFormActive ? 'block' : 'hidden'">
					<div id="clear" class="flex justify-center align-center">
						<button class="bg-transparent p-2 rounded-md mb-2 border border-black" @click="clear">Clear</button>
					</div>
					<ToDoForm @add-todo="addTodo" />
				</div>
			</div>
			<ToDoItem :todos="todos" @delete-item="removeItem" />
			<!-- <div :class="isDisplayed ? 'block' : 'hidden'"> 
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">

	import { reactive, ref } from 'vue'
	import ToDoForm from './ToDoForm.vue'
	import Header from './Header.vue'
	import ToDoItem from './ToDoItems.vue'
	import { Todo } from './types';

	const isNewElementFormActive = ref(true);

	const todos = reactive<Todo[]>([]);

	// const isDisplayed = computed(() => 
  	// 	!isNewElementFormActive.value && !todos.length)

	function addTodo(todo: Todo) {
		const todoCopy = {...todo};
		todos.push(todoCopy);
	}

	function removeItem(index: number) {
		todos.splice(index, 1);
	}

	function toggleVisibility(){
		isNewElementFormActive.value = !isNewElementFormActive.value;
	}

	function clear() {
		todos.splice(0);
	}

</script>