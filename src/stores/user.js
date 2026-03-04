// stores/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(userData, token) {
      this.user = userData;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});
