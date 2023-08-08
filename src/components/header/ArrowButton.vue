<template>
  <button
    class="bg-black py-2 px-3 rounded-md font-semibold flex items-center"
    :class="getBgColor"
  >
    <DownArrowIcon v-if="sortAscending"></DownArrowIcon>
    <UpArrowIcon v-else></UpArrowIcon>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DownArrowIcon from '../icons/DownArrowIcon.vue'
import UpArrowIcon from '../icons/UpArrowIcon.vue'

interface Props {
  sortAscending: boolean
}
const props = defineProps<Props>()

const getBgColor = computed(() =>
  props.sortAscending ? 'bg-black' : 'bg-primary'
)
</script>
