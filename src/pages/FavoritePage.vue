<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">⭐ 즐겨찾기 목록</h1>

    <div v-if="favorites.length === 0">아직 추가된 영화가 없습니다.</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="movie in favorites"
          :key="movie.id"
          class="border rounded p-2 shadow hover:shadow-md transition cursor-pointer"
          @click="$router.push(`/movie/${movie.id}`)"
      >
        <img
            :src="getImageUrl(movie.poster_path)"
            alt="poster"
            class="w-full h-60 object-cover mb-2"
        />
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <p class="text-sm text-gray-500">{{ movie.release_date }}</p>
        <p class="text-sm text-yellow-600">⭐ {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from "../store/favorite";

const { favorites } = useFavoriteStore()

const getImageUrl = (path: string) =>
    path ?  `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'
</script>