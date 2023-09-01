<template>
  <body class="flex h-screen w-screen bg-white">
    <div
      class="m-auto w-full max-w-sm rounded-2xl border-4 border-black bg-lightGray p-5 shadow-xl"
    >
      <header>
        <div
          class="mb-8 flex justify-center text-6xl font-bold text-black opacity-80"
        >
          ToDo App
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
        <div
          v-if="errorMessage"
          class="px-3 pb-6 text-center text-sm text-red-500"
        >
          {{ errorMessage }}
        </div>
        <div>
          <button
            class="mb-6 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-xl font-bold text-white hover:bg-low"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <footer>
        <RouterLink
          class="float-left text-sm text-black hover:text-low"
          :to="{ name: 'Login' }"
          >Forgot Password?</RouterLink
        >
        <RouterLink
          class="float-right text-sm text-black hover:text-low"
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
  try {
    await loginUser(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    errorMessage.value =
      'Login failed. Please check your credentials and try again.'
    console.error('[loginUser Error]', error)
  }
}
</script>
