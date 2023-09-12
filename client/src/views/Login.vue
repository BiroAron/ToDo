<template>
  <body class="flex h-screen w-screen bg-white font-custom">
    <div class="m-auto w-full max-w-sm rounded-xl border-2 border-black p-3">
      <header>
        <div
          class="mb-8 mt-8 flex justify-center text-6xl font-semibold text-black"
        >
          To do app
        </div>
      </header>
      <form @submit.prevent="login">
        <BaseInput
          v-model="email"
          input-name="Email"
          input-type="text"
        ></BaseInput>
        <BaseInput
          v-model="password"
          input-name="Password"
          input-type="password"
          class="pb-6"
        ></BaseInput>
        <div v-if="errorMessage" class="px-3 pb-6 text-center text-red-500">
          {{ errorMessage }}
        </div>
        <div>
          <button
            class="mb-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-black px-4 py-2 text-xl font-bold text-white hover:bg-low"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <footer>
        <RouterLink
          class="float-left text-black hover:text-low"
          :to="{ name: 'Login' }"
          >Forgot Password?</RouterLink
        >
        <RouterLink
          class="float-right text-black hover:text-low"
          :to="{ name: 'SignUp' }"
          >Create Account</RouterLink
        >
      </footer>
    </div>
  </body>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { loginUser } from '../services/authentication'
import { ref } from 'vue'
import BaseInput from '../components/inputfields/BaseInput.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

async function login() {
  if (!isValidInput()) {
    return
  }

  try {
    await loginUser(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    errorMessage.value = 'Wrong email or password. Try again.'
    console.error('[loginUser Error]', error)
  }
}

function isValidInput() {
  if (email.value.trim() === '' || password.value.trim() === '') {
    errorMessage.value = 'Please fill in all fields.'
    return false
  }

  if (!email.value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
    errorMessage.value = 'Please enter a valid email address.'
    return false
  }

  return true
}
</script>
