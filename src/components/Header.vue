<template>
  <header>
    <div class="headerText">
    To do list
    </div>
    <div class="headerButton">
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
      </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
}

header button{
  width: 60px;
  height: 60x;
  left: 950px;
  top: 90px;
  border-radius: 30px;
  outline: none;
  border: none;
  background: #38CB89;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.headerText{
  font-weight: 600;
  font-size: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>