<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">🎬 영화 검색</h1>

    <div class="flex gap-2 mb-6">
      <input
          v-model="query"
          @keyup.enter="searchMovies"
          class="flex-1 p-2 border rounded"
          type="text"
          placeholder="영화 제목을 입력하세요"
      />
      <button @click="searchMovies" class="bg-blue-500 text-white px-4 rounded">검색</button>
    </div>

    <div v-if="loading">🔍 검색 중...</div>
    <div v-else-if="movies.length === 0 && searched">❌ 결과가 없습니다.</div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="movie in movies"
          :key="movie.id"
          class="border rounded p-2 shadow hover:shadow-md transition cursor-pointer relative"
      >
        <img
            :src="getImageUrl(movie.poster_path)"
            alt="poster"
            class="w-full h-60 object-cover mb-2"
            @click="$router.push(`/movie/${movie.id}`)"
        />
        <button
            class="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
            @click.stop="favoriteStore.toggleFavorite(movie)"
          >
          <span v-if="favoriteStore.isFavorite(movie.id)">💖</span>
          <span v-else>🤍</span>
        </button>
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <p class="text-sm text-gray-500">{{ movie.release_date }}</p>
        <p class="text-sm text-yellow-600">⭐ {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useFavoriteStore } from '../store/favorite'

const favoriteStore = useFavoriteStore()
const query = ref('')
const movies = ref<any[]>([])
const loading = ref(false)
const searched = ref(false)

const searchMovies = async () => {
  if (!query.value.trim()) return

  loading.value = true
  searched.value = true
  try {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: query.value,
        api_key: apiKey,
        language: 'ko-KR',
      },
    })
    movies.value = res.data.results
    console.log("result", movies.value)
  } catch (e) {
    console.error('검색 실패:', e)
    movies.value = []
  } finally {
    loading.value = false
  }
}

const getImageUrl = (path: string) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'
</script>
