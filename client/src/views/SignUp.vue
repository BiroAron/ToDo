<template>
  <body class="flex h-screen w-screen bg-white">
    <div
      class="m-auto w-full max-w-lg rounded-2xl border-4 border-black bg-[#fff7f7] p-5 shadow-xl"
    >
      <header>
        <div
          class="mb-8 flex justify-center text-6xl font-bold text-black opacity-80"
        >
          ToDo App
        </div>
      </header>
      <form @submit.prevent="register">
        <div class="mb-2 flex flex-row space-x-4">
          <div>
            <label class="mb-1 block text-black">Firs name</label>
            <input
              v-model="firstName"
              class="w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
              type="text"
            />
          </div>
          <div>
            <label class="mb-1 block text-black">Last name</label>
            <input
              v-model="lastName"
              class="w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
              type="text"
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-black">Email</label>
          <input
            v-model="email"
            class="mb-6 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-300"
            type="text"
          />
        </div>
        <div>
          <label class="mb-1 block text-black">Password</label>
          <input
            v-model="password"
            class="mb-2 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-200"
            type="password"
          />
        </div>
        <div>
          <label class="mb-1 block text-black">Repeat Password</label>
          <input
            class="mb-6 w-full rounded-lg border-2 border-black p-2 text-black outline-none focus:bg-gray-200"
            type="password"
          />
        </div>
        <div>
          <button
            class="mb-6 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-xl font-bold text-white hover:bg-low"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <footer>
        <RouterLink
          class="float-left text-sm text-black hover:text-low"
          href="#"
          :to="{ name: 'SignUp' }"
          >Forgot Password?</RouterLink
        >
        <RouterLink
          class="float-right text-sm text-black hover:text-low"
          href="#"
          :to="{ name: 'Login' }"
          >Login</RouterLink
        >
      </footer>
    </div>
  </body>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { registerUser, loginUser } from '../api'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

const router = useRouter()

async function register() {
  try {
    await registerUser(
      email.value,
      password.value,
      firstName.value,
      lastName.value
    )
  } catch (error) {
    console.error('Error:', error)
  }

  const token = await loginUser(email.value, password.value)
  console.log('JWT Token:', token)
  router.push({ name: 'Dashboard' })
}
</script>
