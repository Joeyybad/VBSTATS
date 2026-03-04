// stores/club.js
import api from "@/config";
import { defineStore } from "pinia";

export const useClubStore = defineStore("club", {
  state: () => ({
    club: null,
  }),
  actions: {
    async fetchClubByUserId(userId) {
      try {
        const response = await api.get(`/club/by-user/${userId}`);

        this.club = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du club :", error);
        throw error;
      }
    },
  },
  persist: true,
});
