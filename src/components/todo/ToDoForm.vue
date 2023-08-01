<template>
  <div class="mb-10 border border-black rounded-xl border-2">
    <div class="w-full h-full px-3 py-4 rounded-md font-custom">
      <div class="flex justify-between">
        <div>
          <input
            v-model="localTodo.title"
            class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
            type="text"
            placeholder="Title"
          />
        </div>
        <div class="relative w-30">
          <div
            class="flex cursor-pointer mb-0 px-8 py-1 justify-center my-3 rounded-3xl font-semibold text-white"
            :class="priorityColorChange(props.todo.priority)"
            @click="toggleDropdown"
          >
            {{ localTodo.priority }}
          </div>
          <ul
            class="absolute bg-white mt-2 mr-2 rounded-xl font-medium border border-black border-2 right-0"
            :class="getDropdownState"
          >
            <div class="flex flex-col items-start">
              <li>
                <p
                  class="block px-3 text-black cursor-pointer"
                  @click="updatePriority('Low', index)"
                >
                  Low
                </p>
              </li>
              <li>
                <p
                  class="block px-3 text-black cursor-pointer"
                  @click="updatePriority('Medium', index)"
                >
                  Medium
                </p>
              </li>
              <li>
                <p
                  class="block px-3 text-black cursor-pointer"
                  @click="updatePriority('High', index)"
                >
                  High
                </p>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div>
        <textarea
          v-model="localTodo.text"
          class="w-full p-2 mt-1 flex placeholder-gray-500 font-semibold focus:outline-none"
          type="text"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="flex justify-start align-center mt-4">
        <button
          class="bg-green-500 py-2 px-8 mr-2 rounded-xl font-semibold text-white flex justify-center align-center"
          @click="handleSaveClick(index)"
        >
          Save
        </button>
        <button
          class="bg-gray-300 py-2 px-7 rounded-xl font-semibold text-black flex justify-center align-center"
          @click="changePopupState"
        >
          Delete
        </button>
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
import { ColorMap } from '../../types/ColorMap'
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue'

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

const colorMap: ColorMap = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const localTodo = ref(props.todo)
const isDropdownOpen = ref(false)
const isPopupActive = ref(false)

const getDropdownState = computed(() =>
  isDropdownOpen.value ? 'block' : 'hidden'
)

const getPopupState = computed(() => (isPopupActive.value ? 'block' : 'hidden'))

function handleSaveClick(index: number) {
  modifyTodo(index)
  toggleEditVisibility()
}

function priorityColorChange(priority: TodoPriority) {
  return colorMap[priority]
}

function updatePriority(priority: TodoPriority, index: number) {
  emit('updateTodoPriority', priority, index)
  toggleDropdown()
}

function modifyTodo(index: number) {
  if (props.todo.title) {
    if (index === -1) {
      emit('addTodo', localTodo.value)
      emptyForm()
    } else emit('editTodo', localTodo.value, index)
  }
}

function emptyForm() {
  localTodo.value.title = ''
  localTodo.value.text = ''
  localTodo.value.priority = 'Low'
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
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
</script>
