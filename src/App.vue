<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav class="p-4 bg-gray-100 flex gap-4">
    <router-link to="/" class="text-blue-500 hover:underline">🏠 홈</router-link>
    <router-link to="/favorites" class="text-pink-500 hover:underline">⭐ 즐겨찾기</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
</style>
