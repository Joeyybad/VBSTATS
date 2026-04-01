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
      { path: "profil", name: "Profil", component: Profil },
      { path: "club", name: "Club", component: Club },
      { path: "historique", name: "Historique", component: Historique },
      { path: "matchstats", name: "Matchstats", component: Matchstats },
      { path: "gestion", name: "Gestion", component: Gestion },
      { path: "match/:clubId", name: "Gamesheet", component: Gamesheet },
      { path: "compte", name: "Compte", component: Compte },
      { path: "editcompte", name: "EditCompte", component: EditCompte },
      { path: "clubcreate", name: "ClubCreate", component: ClubCreate },
      { path: "editclub", name: "EditClub", component: EditClub },
      { path: "confirm-email", name: "ConfirmEmail", component: ConfirmEmail },
      { path: "cgu", name: "CGU", component: CGU },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
