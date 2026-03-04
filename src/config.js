import axios from "axios";
import { useUserStore } from "@/stores/user";

const defaultUrl = "http://localhost:8081/api";
const currentUrl = import.meta.env.VITE_API_URL || defaultUrl;

const api = axios.create({
  baseURL: currentUrl,
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
