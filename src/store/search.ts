import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => ({
        searched: false,
        query: '',
        results: [] as any[],
    }),
    actions: {
        reset() {
            this.searched = false
            this.query = ''
            this.results = []
        }
    }
})