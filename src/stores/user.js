// stores/userStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.isAdmin || false,
    isModerator: (state) => state.user?.isModerator || false,
    // Un utilisateur "Staff" est soit Admin soit Modo
    isStaff: (state) => state.user?.isAdmin || state.user?.isModerator || false,
  },
  actions: {
    setUser(userData, token) {
      this.user = userData;
      this.token = token;
    },
    setAdminStatus(status) {
      if (this.user) {
        this.user.isAdmin = status;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});
