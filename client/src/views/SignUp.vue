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
      <form>
        <div class="mb-2 flex flex-row space-x-4">
          <div>
            <BaseInput input-name="First name" input-type="text"></BaseInput>
          </div>
          <div>
            <BaseInput input-name="Last name" input-type="text"></BaseInput>
          </div>
        </div>

        <BaseInput input-name="Email" input-type="text"></BaseInput>
        <BaseInput input-name="Password" input-type="password"></BaseInput>
        <BaseInput
          input-name="Repeat Password"
          input-type="password"
        ></BaseInput>
        <div>
          <RouterLink
            class="mb-6 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-xl font-bold text-white hover:bg-low"
            :to="{ name: 'Dashboard' }"
          >
            Register
          </RouterLink>
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
import { RouterLink } from 'vue-router'
import BaseButton from '../components/todo/BaseButton.vue'
import BaseInput from '../components/inputfields/BaseInput.vue'
</script>
