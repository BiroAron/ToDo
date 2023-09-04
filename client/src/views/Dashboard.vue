<template>
  <div class="mx-auto h-screen w-1/2 min-w-[350px] max-w-xl font-custom">
    <div class="h-screen px-5">
      <Logout></Logout>

      <Header @toggle-new-todo="toggleNewTodo"></Header>

      <Searchbar
        v-if="todos.length || searchQuery"
        @set-search-query="debouncedSetSearchQuery"
      />

      <Filter
        v-if="todos.length"
        class="mb-6 px-1"
        :sort-ascending="sortAscending"
        :active-button="activeButton"
        @sort-todos="setActiveButton"
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
        :todos="todos"
        @update-item-list="updateItemList"
        @toggle-task-state="toggleTaskState"
        @delete-item="deleteItem"
        @edit-todo="editTodo"
      >
      </ToDoItems>

      <EmptyListImage v-if="getEmptyListImage" />

      <div
        v-if="!todos.length && !getEmptyListImage && searchQuery"
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
import { debounce } from 'lodash'
import {
  addNewTodo,
  fetchTodos,
  editCurrentTodo,
  deleteCurrentTodo,
  getCurrentTodo
} from '../services/todo'

const isNewElementFormActive = ref(false)
const todos = reactive<Todo[]>([])
const sortAscending = ref(true)
const activeButton = ref('')
const searchQuery = ref('')

const emptyTodo = reactive<Todo>({
  _id: '',
  title: '',
  priority: 'Medium',
  description: '',
  isChecked: false,
  date: new Date()
})

const getEmptyListImage = computed(
  () =>
    !isNewElementFormActive.value && !todos.length && searchQuery.value === ''
)

const debouncedSetSearchQuery = debounce((searchSentence: string) => {
  searchQuery.value = searchSentence
  fetchAndAddTodos()
}, 500)

function setActiveButton(sortCriteria: string) {
  activeButton.value = sortCriteria
  fetchAndAddTodos()
}

async function addTodo(todo: Todo) {
  try {
    const response = await addNewTodo(todo)
    appendTodo(response._id)
  } catch (error) {
    console.error('[addTodo Error]', error)
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
    console.error('[deleteItem Error]', error)
  }
}

function closeEdit() {
  isNewElementFormActive.value = false
}

async function toggleTaskState(index: number) {
  todos[index].isChecked = !todos[index].isChecked
  await editCurrentTodo(todos[index])
}

function toggleNewTodo() {
  isNewElementFormActive.value = !isNewElementFormActive.value
}

function setSortOrderAscending() {
  sortAscending.value = true
  fetchAndAddTodos()
}

function setSortOrderDescending() {
  sortAscending.value = false
  fetchAndAddTodos()
}

async function editTodo(editedTodo: Todo) {
  try {
    const editedIndex = findTodoIndexById(editedTodo._id)
    await editCurrentTodo(editedTodo)
    todos.splice(editedIndex, 1, editedTodo)
  } catch (error) {
    console.error('[editTodo Error]', error)
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
  console.log('fetchAndAddTodos')

  try {
    const todosData = await fetchTodos(
      searchQuery.value,
      activeButton.value,
      sortAscending.value
    )

    const parsedTodos = todosData.map(function (todo: Todo) {
      return {
        ...todo,
        date: new Date(todo.date)
      }
    })

    todos.splice(0, todos.length, ...parsedTodos)
  } catch (error) {
    console.error('[fetchAndAddTodos Error]', error)
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
