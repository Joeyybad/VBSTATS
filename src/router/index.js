import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '/src/layouts/DefaultLayout.vue';
import RegisteredLayout from '/src/layouts/RegisteredLayout.vue';
import Club from '/src/views/Club.vue';
import Compte from '/src/views/Compte.vue';
import Connexion from '/src/views/Connexion.vue';
import Gestion from '/src/views/Gestion.vue';
import Historique from '/src/views/HistoriqueMatchs.vue';
import Home from '/src/views/Home.vue';
import Inscription from '/src/views/Inscription.vue';
import Profil from '/src/views/Profil.vue';

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: 'connexion',
                name: 'Connexion',
                component: Connexion
            },
            {
                path: 'inscription',
                name: 'Inscription',
                component: Inscription
            }
        ]
    },
    {
        path: '',
        component: RegisteredLayout,
        children: [
            {
                path: 'profil',
                name: 'Profil',
                component: Profil
            },
            {
                path: 'compte',
                name: 'Compte',
                component: Compte
            },
            {
                path: 'club',
                name: 'Club',
                component: Club
            },
            {
                path: 'gestion',
                name: 'Gestion',
                component: Gestion
            },
            {
                path: 'historique',
                name: 'Historique',
                component: Historique
            }


        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
