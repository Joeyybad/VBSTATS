// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: (() => {
            try {
                const stored = localStorage.getItem('user');
                return stored ? JSON.parse(stored) : null;
            } catch (e) {
                console.error("Erreur lors du parsing du user depuis le localStorage :", e);
                return null;
            }
        })(),
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
