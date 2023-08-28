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
      <form>
        <BaseInput input-name="Email" input-type="text"></BaseInput>
        <BaseInput input-name="Password" input-type="password"></BaseInput>
        <RouterLink
          class="mb-6 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-xl font-bold text-white hover:bg-low"
          :to="{ name: 'Dashboard' }"
        >
          Login
        </RouterLink>
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
import { RouterLink } from 'vue-router'
import BaseInput from '../components/inputfields/BaseInput.vue'
</script>
