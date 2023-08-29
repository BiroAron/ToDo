<template>
  <body class="flex h-screen w-screen bg-white">
    <div
      class="m-auto w-full max-w-sm rounded-2xl border-4 border-black bg-[#fff7f7] p-5 shadow-xl"
    >
      <header>
        <div
          class="mb-8 flex justify-center text-6xl font-bold text-black opacity-80"
        >
          ToDo App
        </div>
      </header>
      <form @submit.prevent="login">
        <div>
          <label class="mb-1 block text-black">Email</label>
          <input
            v-model="email"
            class="mb-4 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
            type="email"
          />
        </div>
        <div>
          <label class="mb-1 block text-black">Password</label>
          <input
            v-model="password"
            class="mb-6 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-200"
            type="password"
          />
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
          href="#"
          :to="{ name: 'Login' }"
          >Forgot Password?</RouterLink
        >
        <RouterLink
          class="float-right text-sm text-black hover:text-low"
          href="#"
          :to="{ name: 'SignUp' }"
          >Create Account</RouterLink
        >
      </footer>
    </div>
  </body>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { loginUser } from '../api'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const router = useRouter()

async function login() {
  try {
    await loginUser(email.value, password.value)
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
