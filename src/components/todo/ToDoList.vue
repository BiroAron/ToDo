<template>
  <div class="mx-auto h-screen w-1/2 min-w-[350px] max-w-xl font-custom">
    <div class="h-screen px-5">
      <Header @toggle-new-todo="toggleNewTodo"></Header>

      <Searchbar v-if="todos.length" @set-search-query="setSearchQuery" />

      <Filter
        v-if="todos.length && filteredTodos.length"
        class="mb-6 px-1"
        :sort-ascending="sortAscending"
        :active-button="activeButton"
        @sort-todos="sortTodos"
        @set-sort-order-ascending="setSortOrderAscending"
        @set-sort-order-descending="setSortOrderDescending"
      ></Filter>

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

      <div
        v-if="
          !filteredTodos.length && !getEmptyListImage && !isNewElementFormActive
        "
        class="align-center flex justify-center text-xl font-semibold"
      >
        There are no todos with this keyword
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
import Searchbar from '../header/Searchbar.vue'
import Filter from '../header/Filter.vue'
import { Todo } from '../../types/Todo'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>(getFromLocalStorage())
const searchQuery = ref('')
const sortAscending = ref(true)
const activeButton = ref('')

const emptyTodo = reactive<Todo>({
  title: '',
  priority: 'Low',
  description: '',
  isChecked: false,
  date: formatTimestampToDateString(Date.now())
})

const getEmptyListImage = computed(
  () => !isNewElementFormActive.value && !todos.length
)

const filteredTodos = computed(() => {
  return todos.filter((todo) => {
    const searchLower = searchQuery.value.toLowerCase()
    const titleLower = todo.title.toLowerCase()
    const textLower = todo.description?.toLowerCase()
    return titleLower.includes(searchLower) || textLower.includes(searchLower)
  })
})

function formatTimestampToDateString(timestamp: number) {
  const currentDate: Date = new Date(timestamp)
  const day: number = currentDate.getDate()
  const month: number = currentDate.getMonth() + 1
  const year: number = currentDate.getFullYear()

  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`
}

function sortTodos(sortCriteria: string) {
  const sortedTodos = [...todos]
  activeButton.value = sortCriteria
  sortedTodos.sort((a, b) => {
    switch (sortCriteria) {
      case 'title':
        return sortByTitle(a, b)
      case 'description':
        return sortByDescription(a, b)
      case 'date':
        return sortByDate(a, b)
      case 'priority':
        return sortByPriority(a, b)
      default:
        return 0
    }
  })
  todos.splice(0, todos.length, ...sortedTodos)
}

function sortByTitle(a: Todo, b: Todo) {
  return sortAscending.value
    ? a.title.localeCompare(b.title)
    : b.title.localeCompare(a.title)
}

function sortByDescription(a: Todo, b: Todo) {
  return sortAscending.value
    ? a.description.localeCompare(b.description)
    : b.description.localeCompare(a.description)
}

function sortByDate(a: Todo, b: Todo) {
  const dateA = new Date(a.date)
  const dateB = new Date(b.date)

  if (sortAscending.value) return dateA.getTime() - dateB.getTime()

  return dateB.getTime() - dateA.getTime()
}

function sortByPriority(a: Todo, b: Todo) {
  const priorityOrder = ['Low', 'Medium', 'High']
  const priorityA = priorityOrder.indexOf(a.priority)
  const priorityB = priorityOrder.indexOf(b.priority)

  if (sortAscending.value) return priorityA - priorityB

  return priorityB - priorityA
}

function setSearchQuery(searchSentence: string) {
  searchQuery.value = searchSentence
}

function addTodo(todo: Todo) {
  const todoCopy = reactive<Todo>({
    title: todo.title,
    priority: todo.priority,
    description: todo.description,
    isChecked: todo.isChecked,
    date: todo.date
  })
  todos.unshift(todoCopy)
  toggleNewTodo()
  saveToLocalStorage()
}

function deleteNewItem() {
  toggleNewTodo()
}

function deleteItem(index: number) {
  todos.splice(index, 1)
  saveToLocalStorage()
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

function setSortOrderAscending() {
  sortAscending.value = true
  sortTodos(activeButton.value)
}

function setSortOrderDescending() {
  sortAscending.value = false
  sortTodos(activeButton.value)
}

function editTodo(todo: Todo, index: number) {
  const todoCopy = reactive<Todo>({
    title: todo.title,
    priority: todo.priority,
    description: todo.description,
    isChecked: todo.isChecked,
    date: todo.date
  })
  todos[index] = todoCopy
  saveToLocalStorage()
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

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getFromLocalStorage() {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : []
}
</script>
