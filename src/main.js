import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App);

// Création de Pinia
const pinia = createPinia();
// Ajout du plugin de persistance
pinia.use(piniaPluginPersistedstate);

// Montage dans l'app
app.use(pinia);
app.use(router);
app.mount('#app');
