// Utilities
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => {
        const store = localStorage.getItem('store');
        if (store) return JSON.parse(store);
        return {
            username: ''
        };
    },
    getters: {
        getUsername(): string {
            return this.username;
        }
    },
    actions: {
        setUsername(username: string): void {
            this.username = username;
        }
    }
});
