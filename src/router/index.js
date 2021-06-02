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

  {
    path: "/",
    name: "Wellecome",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // Authentication Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("email");
  const isRoutePublic = guestRoutes.some((route) => route.name === to.name);
  document.title = "Instabug | " + to.name;
  if (!isRoutePublic && !token) next({ name: "Login", path: "/login" });
  if (isRoutePublic && token) next({ name: "Wellecome", path: "/" });
  else next();
});

export default router;
