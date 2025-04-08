import { defineStore } from 'pinia'

export interface Movie {
    id: number
    title: string
    poster_path: string
    release_date: string
    vote_average: number
}

export const useFavoriteStore = defineStore('favorite', {
    state: () => ({
        favorites: [] as Movie[],
    }),
    actions: {
        toggleFavorite(movie: Movie) {
            const exists = this.favorites.find((m) => m.id === movie.id)
            if (exists) {
                this.favorites = this.favorites.filter((m) => m.id !== movie.id)
            } else {
                this.favorites.push(movie)
            }
            this.saveToLocalStorage()
        },
        isFavorite(id: number): boolean {
            return this.favorites.some((m) => m.id === id)
        },
        loadFromLocalStorage() {
            const saved = localStorage.getItem('favorites')
            if (saved) {
                this.favorites = JSON.parse(saved)
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('favorites', JSON.stringify(this.favorites))
        },
    },
})