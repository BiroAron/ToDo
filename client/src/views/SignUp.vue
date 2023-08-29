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
        <div class="mb-2 flex flex-row space-x-2">
          <BaseInput
            :input-value="email"
            input-name="First name"
            input-type="text"
            @update-value="updateFirstName"
          ></BaseInput>
          <BaseInput
            :input-value="email"
            input-name="Last name"
            input-type="text"
            @update-value="updateLastName"
          ></BaseInput>
        </div>
        <BaseInput
          :input-value="email"
          class="pb-2"
          input-name="Email"
          input-type="text"
          @update-value="updateEmail"
        ></BaseInput>
        <BaseInput
          :input-value="password"
          input-name="Password"
          input-type="password"
          @update-value="updatePassword"
        ></BaseInput>
        <BaseInput
          :input-value="repeatPassword"
          class="pb-6"
          input-name="Repeat Password"
          input-type="password"
          @update-value="updateRepeatPassword"
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
import { registerUser, loginUser } from '../api'
import { ref } from 'vue'
import BaseInput from '../components/inputfields/BaseInput.vue'

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
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

function updateEmail(newEmail: string) {
  email.value = newEmail
}

function updatePassword(newPassword: string) {
  password.value = newPassword
}

function updateRepeatPassword(newPassword: string) {
  password.value = newPassword
}

function updateFirstName(newFirstName: string) {
  firstName.value = newFirstName
}

function updateLastName(newLastName: string) {
  lastName.value = newLastName
}
</script>
