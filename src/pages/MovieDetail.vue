<template>
  <div class="max-w-4xl mx-auto p-4">
    <button @click="$router.back()" class="mb-4 text-blue-500 hover:underline">← 뒤로가기</button>

    <div v-if="loading">로딩 중...</div>
    <div v-else-if="movie">
      <div class="flex flex-col md:flex-row gap-6">
        <img
            :src="getImageUrl(movie.poster_path)"
            alt="poster"
            class="w-full md:w-1/3 h-auto rounded shadow"
        />
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ movie.title }}</h1>
          <p class="text-gray-500 mb-1">개봉일: {{ movie.release_date }}</p>
          <p class="text-yellow-600 mb-3">⭐ 평점: {{ movie.vote_average }}</p>
          <p class="text-sm leading-relaxed">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
    <div v-else>❌ 영화를 찾을 수 없습니다.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movie = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      params: {
        api_key: apiKey,
        language: 'ko-KR',
      },
    })
    movie.value = res.data
  } catch (e) {
    console.error('영화 상세 정보 요청 실패:', e)
  } finally {
    loading.value = false
  }
})

const getImageUrl = (path: string) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'
</script>
