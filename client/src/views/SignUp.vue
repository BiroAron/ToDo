<template>
  <body class="flex h-screen w-screen bg-white">
    <div
      class="m-auto w-full max-w-lg rounded-2xl border-4 border-black bg-lightGray p-5 shadow-xl"
    >
      <header>
        <div
          class="mb-8 flex justify-center text-6xl font-bold text-black opacity-80"
        >
          ToDo App
        </div>
      </header>
      <form @submit.prevent="register">
        <div class="mb-2 flex space-x-2">
          <BaseInput
            v-model="user.firstName"
            input-name="First name"
            input-type="text"
          ></BaseInput>
          <BaseInput
            v-model="user.lastName"
            input-name="Last name"
            input-type="text"
          ></BaseInput>
        </div>
        <BaseInput
          v-model="user.email"
          class="pb-2"
          input-name="Email"
          input-type="text"
        ></BaseInput>
        <BaseInput
          v-model="user.password"
          input-name="Password"
          input-type="password"
        ></BaseInput>
        <BaseInput
          v-model="repeatPassword"
          class="pb-6"
          input-name="Repeat Password"
          input-type="password"
        ></BaseInput>
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
import { registerUser, loginUser } from '../services/authentication'
import { reactive, ref } from 'vue'
import BaseInput from '../components/inputfields/BaseInput.vue'
import { User } from '../types/User'

const user: User = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const repeatPassword = ref('')

const router = useRouter()

async function register() {
  try {
    await registerUser(user)
  } catch (error) {
    console.error('Error:', error)
  }

  await loginUser(user.email, user.password)
  router.push({ name: 'Dashboard' })
}
</script>
