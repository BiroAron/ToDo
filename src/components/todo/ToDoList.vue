<template>
  <div class="w-1/2 h-screen mx-auto max-w-xl min-w-[350px] font-custom">
    <div class="px-5 h-screen">
      <Header @toggle-new-todo="toggleNewTodo"></Header>

      <Searchbar class="mb-15" @set-search-query="setSearcQuery" />
      <ToDoForm
        v-if="isNewElementFormActive"
        :todo="emptyTodo"
        :index="-1"
        @add-todo="addTodo"
        @delete-item="deleteNewItem"
        @close-edit="closeEdit"
      ></ToDoForm>

      <ToDoItems
        :todos="filteredTodos"
        @update-item-list="updateItemList"
        @toggle-task-state="toggleTaskState"
        @delete-item="deleteItem"
        @edit-todo="editTodo"
      >
      </ToDoItems>

      <EmptyListImage v-if="getEmptyListImage" />

      <div class="flex justify-center items-center">
        <BaseButton
          buttonstyles="bg-white text-black border border-black"
          button-name="Clear"
          @click="clear"
        ></BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ToDoForm from './ToDoForm.vue'
import Header from '../header/Header.vue'
import ToDoItems from './ToDoItems.vue'
import EmptyListImage from '../icons/EmptyListIcon.vue'
import { Todo } from '../../types/Todo'
import Searchbar from '../header/Searchbar.vue'
import BaseButton from './BaseButton.vue'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>([])
const searchQuery = ref('')

const currentTimestamp: number = Date.now()

const currentDate: Date = new Date(currentTimestamp)
const day: number = currentDate.getDate()
const month: number = currentDate.getMonth() + 1
const year: number = currentDate.getFullYear()

const currentDateString: string = `${day.toString().padStart(2, '0')}/${month
  .toString()
  .padStart(2, '0')}/${year}`

const emptyTodo = reactive<Todo>({
  title: '',
  priority: 'Low',
  text: '',
  isChecked: false,
  date: currentDateString
})

const getEmptyListImage = computed(
  () => !isNewElementFormActive.value && !todos.length
)

const filteredTodos = computed(() => {
  return todos.filter((todo) => {
    const searchLower = searchQuery.value.toLowerCase()
    const titleLower = todo.title.toLowerCase()
    return titleLower.includes(searchLower)
  })
})

function setSearcQuery(searchSentence: string) {
  searchQuery.value = searchSentence
}

function addTodo(todo: Todo) {
  const todoCopy = reactive<Todo>({
    title: todo.title,
    priority: todo.priority,
    text: todo.text,
    isChecked: todo.isChecked,
    date: todo.date
  })
  todos.unshift(todoCopy)
  toggleNewTodo()
}

function deleteNewItem() {
  toggleNewTodo()
}

function deleteItem(index: number) {
  todos.splice(index, 1)
}

function closeEdit() {
  isNewElementFormActive.value = false
}

function toggleTaskState(index: number) {
  todos[index].isChecked = !todos[index].isChecked
}

function toggleNewTodo() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function clear() {
  todos.splice(0)
}

function editTodo(todo: Todo, index: number) {
  const todoCopy = reactive<Todo>({
    title: todo.title,
    priority: todo.priority,
    text: todo.text,
    isChecked: todo.isChecked,
    date: todo.date
  })
  todos[index] = todoCopy
}

function updateItemList(index: number) {
  const todoSave: Todo = todos[index]
  todos.splice(index, 1)[0]
  if (todoSave.isChecked) {
    todos.push(todoSave)
  } else {
    todos.unshift(todoSave)
  }
}
</script>
