<template>
  <div class="mb-6 flex items-center justify-between border-b-2 pb-10 pt-16">
    <p class="ml-2 text-xl">Welcome, {{ firstnName }}!</p>
    <div class="ml-auto">
      <RouterLink
        class="align-center mr-2 flex justify-center rounded-xl bg-gray-300 px-8 py-2 font-semibold text-black phone:px-6 phone:py-1 phone:text-sm"
        href="#"
        :to="{ name: 'Login' }"
        >Logout</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const firstnName = ref(localStorage.getItem('firstName'))
</script>
