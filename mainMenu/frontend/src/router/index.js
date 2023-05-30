import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../components/HelloWorld.vue";
import SignUp from "../components/right/vue/SignUp.vue";
import SignIn from "../components/right/vue/SignIn.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;