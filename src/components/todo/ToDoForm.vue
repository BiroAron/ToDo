<template>
  <div class="mb-10 border border-black rounded-xl border-2">
    <div class="w-full h-full px-3 py-4 rounded-md font-custom">
      <div class="flex justify-between">
        <TodoTitle
          :title="localTodo.title"
          @update-title="updateTitle"
        ></TodoTitle>
        <ToDoPriority
          :todo="localTodo"
          :index="index"
          @update-priority="updatePriority"
        ></ToDoPriority>
      </div>
      <ToDoDescription
        :description="localTodo.text"
        @update-description="updateDescription"
      ></ToDoDescription>
      <div class="flex justify-start align-center mt-4">
        <ToDoButton
          :buttonstyles="'bg-primary text-white'"
          :button-name="'Save'"
          @handle-click="handleSaveClick"
        ></ToDoButton>
        <ToDoButton
          :buttonstyles="'bg-gray-300 text-black'"
          :button-name="'Delete'"
          @handle-click="changePopupState"
        ></ToDoButton>
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
import { computed, reactive, ref } from 'vue'
import { Todo, TodoPriority } from '../../types/Todo'
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue'
import TodoTitle from './ToDoTitle.vue'
import ToDoDescription from './ToDoDescription.vue'
import ToDoPriority from './ToDoPriority.vue'
import ToDoButton from './Button.vue'

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
}>()

const localTodo = reactive<Todo>({
  title: props.todo.title,
  priority: props.todo.priority,
  text: props.todo.text,
  isChecked: props.todo.isChecked
})

const isPopupActive = ref(false)
const getPopupState = computed(() => (isPopupActive.value ? 'block' : 'hidden'))

function updateTitle(title: string) {
  localTodo.title = title
}

function updateDescription(description: string) {
  localTodo.text = description
}

function updatePriority(priority: TodoPriority) {
  localTodo.priority = priority
}

function handleSaveClick() {
  modifyTodo(props.index)
  toggleEditVisibility()
}

function modifyTodo(index: number) {
  const currentLocalTodo = localTodo

  if (!currentLocalTodo.title) {
    return
  }

  if (index === -1) {
    emit('addTodo', currentLocalTodo)
    emptyForm()
    return
  }

  emit('editTodo', currentLocalTodo, index)
}

function emptyForm() {
  localTodo.title = ''
  localTodo.text = ''
  localTodo.priority = 'Low'
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
  toggleEditVisibility()
}
</script>
