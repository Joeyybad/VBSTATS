import { createRouter, createWebHistory } from "vue-router";
import ClubCreate from "../views/ClubCreate.vue";
import EditClub from "../views/EditClub.vue";
import EditProfil from "../views/EditProfil.vue";
import DefaultLayout from "/src/layouts/DefaultLayout.vue";
import Club from "/src/views/Club.vue";
import Compte from "/src/views/Compte.vue";
import Connexion from "/src/views/Connexion.vue";
import Matchdirect from "/src/views/GameSheet.vue";
import Gestion from "/src/views/Gestion.vue";
import Historique from "/src/views/HistoriqueMatchs.vue";
import Home from "/src/views/Home.vue";
import Inscription from "/src/views/Inscription.vue";
import Matchstats from "/src/views/MatchStats.vue";
import Profil from "/src/views/Profil.vue";

const routes = [
  // Pages "publiques" ou "plein écran" (sans Header/Navbar/Footer par défaut)
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
      { path: "profil", name: "Profil", component: Profil },
      { path: "club", name: "Club", component: Club },
      { path: "historique", name: "Historique", component: Historique },
      { path: "matchstats", name: "Matchstats", component: Matchstats },
      { path: "gestion", name: "Gestion", component: Gestion },
      { path: "match", name: "Matchdirect", component: Matchdirect },
      { path: "compte", name: "Compte", component: Compte },
      { path: "editprofil", name: "EditProfil", component: EditProfil },
      { path: "clubcreate", name: "ClubCreate", component: ClubCreate },
      { path: "editclub", name: "EditClub", component: EditClub },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
