// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        setUser(userData, token) {
            this.user = userData;
            this.token = token;

            // Persistance dans le localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
        },
        logout() {
            this.user = null;
            this.token = null;

            // Suppression du stockage local
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

