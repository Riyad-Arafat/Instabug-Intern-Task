import { createRouter, createWebHashHistory } from "vue-router";
// import Wellcome from "../views/Wellcome.vue";

const guestRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const routes = [
  ...guestRoutes,

  // {
  //   path: "/",
  //   name: "Wellecome",
  //   component: Wellcome,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // Authentication Guard
router.beforeEach((to, from, next) => {
  const isAuthed = localStorage.getItem("email") ? true : false;
  const isRoutePublic = guestRoutes.some((route) => route.name === to.name);
  document.title = "Instabug | " + to.name;
  if (!isRoutePublic && !isAuthed) next({ name: "Login" });
  else next();
});

export default router;
