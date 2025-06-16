// stores/club.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useClubStore = defineStore('club', {
    state: () => ({
        club: null,
    }),
    actions: {
        async fetchClubByUserId(userId, token) {
            try {
                const response = await axios.get(`http://localhost:8082/club/by-user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.club = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération du club :", error);
                throw error;
            }
        }
    }
});

