<template>
  <div class="mx-auto h-screen w-1/2 min-w-[350px] max-w-xl font-custom">
    <div class="h-screen px-5">
      <Logout></Logout>

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
import { computed, onMounted, reactive, ref } from 'vue'
import ToDoForm from '../components/todo/ToDoForm.vue'
import Header from '../components/header/Header.vue'
import ToDoItems from '../components/todo/ToDoItems.vue'
import EmptyListImage from '../components/icons/EmptyListIcon.vue'
import Searchbar from '../components/header/Searchbar.vue'
import Filter from '../components/header/Filter.vue'
import { Todo } from '../types/Todo'
import Logout from '../components/header/Logout.vue'
import {
  addNewTodo,
  fetchTodos,
  editCurrentTodo,
  deleteCurrentTodo,
  getCurrentTodo
} from '../services/todo'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>([])
const searchQuery = ref('')
const sortAscending = ref(true)
const activeButton = ref('')

const emptyTodo = reactive<Todo>({
  _id: '',
  title: '',
  priority: 'Medium',
  description: '',
  isChecked: false,
  date: new Date()
})

const getEmptyListImage = computed(
  () => !isNewElementFormActive.value && !todos.length
)

const filteredTodos = computed(() => {
  return todos.filter((todo) => {
    const searchLower = searchQuery.value.toLowerCase()
    const titleLower = todo.title?.toLowerCase()
    const textLower = todo.description?.toLowerCase()
    return titleLower?.includes(searchLower) || textLower?.includes(searchLower)
  })
})

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

async function addTodo(todo: Todo) {
  try {
    const response = await addNewTodo(todo)
    appendTodo(response._id)
  } catch (error) {
    console.error('Error:', error)
  }
  toggleNewTodo()
}

function deleteNewItem() {
  toggleNewTodo()
}

async function deleteItem(_id: string) {
  try {
    await deleteCurrentTodo(_id)

    const deletedIndex = findTodoIndexById(_id)
    if (deletedIndex !== -1) {
      todos.splice(deletedIndex, 1)
    }
  } catch (error) {
    console.error('Error:', error)
  }
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

async function editTodo(editedTodo: Todo) {
  try {
    const editedIndex = findTodoIndexById(editedTodo._id)
    if (editedIndex !== -1) {
      await editCurrentTodo(editedTodo)
      todos.splice(editedIndex, 1, editedTodo)
    }
  } catch (error) {
    console.error('Error:', error)
  }
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

function findTodoIndexById(id: string) {
  return todos.findIndex((todo) => todo._id === id)
}

async function fetchAndAddTodos() {
  try {
    const todosData = await fetchTodos()

    const parsedTodos = todosData.map(function (todo: Todo) {
      return {
        ...todo,
        date: new Date(todo.date)
      }
    })

    todos.splice(0, todos.length, ...parsedTodos)
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}

async function appendTodo(_id: string) {
  const newTodo = await getCurrentTodo(_id)
  newTodo.date = new Date(newTodo.date)
  todos.unshift(newTodo)
}

onMounted(() => {
  fetchAndAddTodos()
})
</script>
