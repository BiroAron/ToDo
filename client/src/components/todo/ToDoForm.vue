<template>
  <div class="mb-10 rounded-xl border-2 border-black" ref="todoFormRef">
    <div class="h-full w-full rounded-md px-3 py-4 font-custom">
      <div class="flex justify-between">
        <div class="flex w-full flex-col">
          <TodoTitle
            :title="localTodo.title"
            @update-title="updateTitle"
          ></TodoTitle>
          <ToDoDate
            class="text-sm"
            :date="localTodo.date"
            @update-date="updateDate"
          ></ToDoDate>
        </div>
        <ToDoPriority
          :todo="localTodo"
          :index="index"
          @update-priority="updatePriority"
        ></ToDoPriority>
      </div>
      <ToDoDescription
        :description="localTodo.description"
        @update-description="updateDescription"
      ></ToDoDescription>
      <div class="align-center mt-4 flex justify-start">
        <ToDoButton
          buttonstyles="bg-primary text-white"
          button-name="Save"
          @click="handleSaveClick"
        ></ToDoButton>
        <ToDoButton
          v-if="index !== -1"
          buttonstyles="bg-gray-300 text-black"
          button-name="Delete"
          @click="changePopupState"
        ></ToDoButton>
        <DeleteConfirmationPopup
          v-if="isPopupActive"
          :_id="props.todo._id"
          @close-popup="changePopupState"
          @delete-item="deleteItem"
        ></DeleteConfirmationPopup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Todo, TodoPriority } from '../../types/Todo'
import { onClickOutside } from '@vueuse/core'
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue'
import TodoTitle from './ToDoTitle.vue'
import ToDoDescription from './ToDoDescription.vue'
import ToDoPriority from './ToDoPriority.vue'
import ToDoButton from './BaseButton.vue'
import ToDoDate from './ToDoDate.vue'

interface Props {
  todo: Todo
  index: number
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'addTodo', todo: Todo): void
  (e: 'editTodo', todo: Todo): void
  (e: 'toggleEdit'): void
  (e: 'deleteItem', _id: string): void
  (e: 'closeEdit'): void
}>()

const localTodo = reactive<Todo>({
  _id: props.todo._id,
  title: props.todo.title,
  priority: props.todo.priority,
  description: props.todo.description,
  isChecked: props.todo.isChecked,
  date: props.todo.date
})

const isPopupActive = ref(false)
const todoFormRef = ref()

onClickOutside(todoFormRef, () => {
  emit('closeEdit')
})

function updateTitle(title: string) {
  localTodo.title = title
}

function updateDescription(description: string) {
  localTodo.description = description
}

function updatePriority(priority: TodoPriority) {
  localTodo.priority = priority
}

function updateDate(date: Date) {
  localTodo.date = date
}

function handleSaveClick() {
  modifyTodo(props.index)
  toggleEdit()
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

  emit('editTodo', currentLocalTodo)
}

function emptyForm() {
  localTodo.title = ''
  localTodo.description = ''
  localTodo.priority = 'Low'
}

function changePopupState() {
  isPopupActive.value = !isPopupActive.value
}

function toggleEdit() {
  emit('toggleEdit')
}

function deleteItem(_id: string) {
  emit('deleteItem', _id)
  changePopupState()
  emptyForm()
  toggleEdit()
}
</script>
