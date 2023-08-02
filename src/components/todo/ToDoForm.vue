<template>
  <div class="mb-10 border border-black rounded-xl border-2">
    <div class="w-full h-full px-3 py-4 rounded-md font-custom">
      <div class="flex justify-between">
        <TodoTitle :todo="todo" @update-title="updateTitle"></TodoTitle>
        <ToDoPriority
          :todo="todo"
          :index="index"
          @update-todo-priority="updateTodoPriority"
        ></ToDoPriority>
      </div>
      <ToDoDescription :todo="todo" @update-description="updateDescription">
      </ToDoDescription>
      <div class="flex justify-start align-center mt-4">
        <ToDoSaveButton @handle-save-click="handleSaveClick"> </ToDoSaveButton>
        <ToDoDeleteButton
          @change-popup-state="changePopupState"
        ></ToDoDeleteButton>
        <DeleteConfirmationPopup
          :index="index"
          :class="getPopupState"
          @close-popup="changePopupState"
          @delete-item="deleteItem"
        ></DeleteConfirmationPopup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo, TodoPriority } from '../../types/Todo'
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue'
import TodoTitle from './ToDoTitle.vue'
import ToDoDescription from './ToDoDescription.vue'
import ToDoPriority from './ToDoPriority.vue'
import ToDoSaveButton from './ToDoSaveButton.vue'
import ToDoDeleteButton from './ToDoDeleteButton.vue'

interface Props {
  todo: Todo
  index: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'addTodo', todo: Todo): void
  (e: 'editTodo', todo: Todo, index: number): void
  (e: 'toggleEditVisibility'): void
  (e: 'deleteItem', index: number): void
  (e: 'updateTodoPriority', priority: TodoPriority, index: number): void
}>()

const localTodo = ref(props.todo)
const isPopupActive = ref(false)

const getPopupState = computed(() => (isPopupActive.value ? 'block' : 'hidden'))

function updateTitle(title: string) {
  localTodo.value.title = title
}

function updateDescription(description: string) {
  localTodo.value.title = description
}

function handleSaveClick() {
  modifyTodo(props.index)
  toggleEditVisibility()
}

function modifyTodo(index: number) {
  if (!props.todo.title) {
    return
  }

  if (index === -1) {
    emit('addTodo', localTodo.value)
    emptyForm()
    return
  }

  emit('editTodo', localTodo.value, index)
}

function emptyForm() {
  localTodo.value.title = ''
  localTodo.value.text = ''
  localTodo.value.priority = 'Low'
}

function changePopupState() {
  isPopupActive.value = !isPopupActive.value
}

function toggleEditVisibility() {
  emit('toggleEditVisibility')
}

function deleteItem(index: number) {
  emit('deleteItem', index)
  changePopupState()
  emptyForm()
}

function updateTodoPriority(priority: TodoPriority, index: number) {
  emit('updateTodoPriority', priority, index)
}
</script>
