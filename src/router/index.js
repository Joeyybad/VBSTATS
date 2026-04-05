import { createRouter, createWebHistory } from "vue-router";
import ClubCreate from "../views/ClubCreate.vue";
import EditClub from "../views/EditClub.vue";
import EditCompte from "../views/EditCompte.vue";
import DefaultLayout from "/src/layouts/DefaultLayout.vue";
import Club from "/src/views/Club.vue";
import Compte from "/src/views/Compte.vue";
import Connexion from "/src/views/Connexion.vue";
import Gamesheet from "/src/views/GameSheet.vue";
import Gestion from "/src/views/Gestion.vue";
import Historique from "/src/views/HistoriqueMatchs.vue";
import Home from "/src/views/Home.vue";
import Inscription from "/src/views/Inscription.vue";
import Matchstats from "/src/views/MatchStats.vue";
import Profil from "/src/views/Profil.vue";
import ConfirmEmail from "/src/views/ConfirmEmail.vue";
import CGU from "/src/views/CGU.vue";
import { useUserStore } from "../stores/user";

const routes = [
  // Pages "publiques" ou "plein écran" (sans Header/Navbar/Footer par défaut)
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },

  // Pages de l'application (qui utilisent le DefaultLayout)
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "Home", component: Home },

      // Routes nécessitant d'être connecté
      {
        path: "profil",
        name: "Profil",
        component: Profil,
        meta: { requiresAuth: true },
      },
      {
        path: "club",
        name: "Club",
        component: Club,
        meta: { requiresAuth: true },
      },
      {
        path: "compte",
        name: "Compte",
        component: Compte,
        meta: { requiresAuth: true },
      },
      {
        path: "editcompte",
        name: "EditCompte",
        component: EditCompte,
        meta: { requiresAuth: true },
      },
      {
        path: "clubcreate",
        name: "ClubCreate",
        component: ClubCreate,
        meta: { requiresAuth: true },
      },
      { path: "confirm-email", name: "ConfirmEmail", component: ConfirmEmail },
      { path: "cgu", name: "CGU", component: CGU },

      { path: "historique", name: "Historique", component: Historique },
      { path: "matchstats", name: "Matchstats", component: Matchstats },

      // Routes que par les Admins de club
      {
        path: "editclub",
        name: "EditClub",
        component: EditClub,
        meta: { requiresAuth: true, requiresAdmin: true },
      },

      // Admin ou modérateur de club
      {
        path: "gestion",
        name: "Gestion",
        component: Gestion,
        meta: { requiresAuth: true, requiresStaff: true },
      },
      { path: "match/:clubId", name: "Gamesheet", component: Gamesheet },
      {
        path: "historique",
        name: "Historique",
        component: Historique,
        meta: { requiresAuth: true, requiresStaff: true },
      },
      {
        path: "matchstats",
        name: "Matchstats",
        component: Matchstats,
        meta: { requiresAuth: true, requiresStaff: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- LE GARDE-BARRIÈRE (Navigation Guard) ---
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const user = userStore.user;

  // 1. Vérification de l'authentification
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({ name: "Connexion" });
  }

  // 2. Vérification du rôle ADMIN (pour EditClub)
  if (to.meta.requiresAdmin && !user?.isAdmin) {
    return next({ name: "Profil" }); // Redirige vers profil si pas admin
  }

  // 3. Vérification du rôle STAFF (Admin OU Modo pour Gestion/Feuille de match)
  if (to.meta.requiresStaff && !(user?.isAdmin || user?.isModerator)) {
    return next({ name: "Profil" });
  }

  next();
});

export default router;
