<template>
  <div class="mb-10 border border-black rounded-xl border-2">
    <div class="w-full h-full px-3 py-4 rounded-md font-custom">
      <div class="flex justify-between">
        <div>
          <input
            type="text"
            placeholder="Title"
            v-model="props.todo.title"
            class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
          />
        </div>
        <div class="relative w-30">
          <div
            class="flex cursor-pointer mb-0 px-8 py-1 justify-center my-3 rounded-3xl font-semibold text-white"
            :class="priorityColorChange(props.todo.priority)"
            @click="toggleDropdown"
          >
            {{ props.todo.priority }}
          </div>

          <ul
            class="absolute bg-white mt-2 mr-2 rounded-xl font-medium border border-black border-2 right-0"
            :class="getDropdownState"
          >
            <div class="flex flex-col items-start">
              <li>
                <p
                  class="block px-3 text-gray-800"
                  @click="updatePriority('Low')"
                >
                  Low
                </p>
              </li>
              <li>
                <p
                  class="block px-3 text-gray-80"
                  @click="updatePriority('Medium')"
                >
                  Medium
                </p>
              </li>
              <li>
                <p class="block px-3" @click="updatePriority('High')">High</p>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div>
        <textarea
          class="w-full p-2 mt-1 flex placeholder-gray-500 font-semibold focus:outline-none"
          type="text"
          placeholder="Description"
          v-model="props.todo.text"
        ></textarea>
      </div>
      <div class="flex justify-start align-center mt-4">
        <button
          class="bg-green-500 py-2 px-8 mr-2 rounded-xl font-semibold text-white flex justify-center align-center"
          @click="handleSaveClick()"
        >
          Save
        </button>
        <button
          class="bg-gray-300 py-2 px-7 rounded-xl font-semibold text-black flex justify-center align-center"
          @click="emptyForm()"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Todo } from '../../types/Todo'
import { colorMap } from '../../types/ColorMap'

interface Props {
  todo: Todo
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'modifyTodo', todo: Todo): void
  (e: 'toggleEditVisibility'): void
}>()

const isDropdownOpen = ref(false)

const getDropdownState = computed(() =>
  isDropdownOpen.value ? 'block' : 'hidden'
)

function handleSaveClick() {
  modifyTodo()
  toggleEditVisibility()
}

function priorityColorChange(priority: string) {
  return colorMap[priority]
}

function updatePriority(priority: string) {
  props.todo.priority = priority
  console.log(colorMap[priority])
  toggleDropdown()
}

function modifyTodo() {
  if (props.todo.title) {
    emit('modifyTodo', props.todo)
    emptyForm()
  }
}

function toggleEditVisibility() {
  emit('toggleEditVisibility')
}

function emptyForm() {
  props.todo.title = ''
  props.todo.text = ''
  props.todo.priority = 'Low'
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
