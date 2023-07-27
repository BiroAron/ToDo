<template>
  <div class="w-full h-full p-5 rounded-md font-custom">
    <div class="flex justify-between">
      <div>
        <input
          type="text"
          placeholder="Title"
          v-model="newTodo.title"
          class="text-3xl flex w-full font-semibold placeholder-black focus:outline-none"
        />
      </div>
      <div class="relative w-20 top-0">
        <div
          class="flex cursor-pointer mb-0 justify-center p-1/2 my-3 rounded-3xl font-semibold text-white"
          :class="priorityClass(newTodo.priority)"
          @click="toggleDropdown"
        >
          {{ newTodo.priority }}
        </div>

        <ul
          class="absolute bg-white mt-2 rounded-xl font-medium border border-black border-2 right-0"
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
                class="block px-3 text-gray-800"
                @click="updatePriority('Medium')"
              >
                Medium
              </p>
            </li>
            <li>
              <p
                class="block px-3 text-gray-800"
                @click="updatePriority('High')"
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
        class="w-full p-2 mt-5 flex placeholder-gray-500 font-semibold focus:outline-none"
        type="text"
        placeholder="Description"
        v-model="newTodo.text"
      ></textarea>
    </div>
    <div class="flex justify-start align-center mt-4">
      <button
        class="bg-green-500 py-2 px-8 mr-2 rounded-xl font-semibold text-white flex justify-center align-center"
        @click="addItem()"
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
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Todo } from '../types/Todo'

const colorMap: Record<string, string> = {
  High: 'bg-high',
  Medium: 'bg-medium',
  Low: 'bg-low'
}

const emit = defineEmits<{ (e: 'addTodo', newTodo: Todo): void }>()

const isDropdownOpen = ref(false)

const getDropdownState = computed(() =>
  isDropdownOpen.value ? 'block' : 'hidden'
)

const newTodo = reactive<Todo>({
  title: '',
  priority: 'Low',
  text: '',
  isChecked: false
})

const priorityClass = (priority: string) => colorMap[priority] || 'bg-low'

function updatePriority(priority: string) {
  newTodo.priority = priority
  toggleDropdown()
}

function addItem() {
  if (newTodo.title) {
    emit('addTodo', newTodo)
    emptyForm()
  }
}

function emptyForm() {
  newTodo.title = ''
  newTodo.text = ''
  newTodo.priority = 'Low'
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
