import axios from "axios";

// 1. DÉFINITION DE L'URL
// On regarde si Docker nous donne une URL via VITE_API_URL.
// Sinon (en dev local sans Docker), on utilise l'URL par défaut AVEC LE /api
const defaultUrl = "http://localhost:8081/api";
const currentUrl = import.meta.env.VITE_API_URL || defaultUrl;

// 2. CRÉATION DE L'INSTANCE
const api = axios.create({
  baseURL: currentUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Bonus : Intercepteur pour le token (tu pourras le décommenter plus tard)
/*
import { useAuthStore } from '../stores/useAuthStore';
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
*/

export default api;
