import { createRouter, createWebHashHistory } from "vue-router";

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
    component: () => import("../views/Wellcome.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // Authentication Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("email");
  const isRoutePublic = guestRoutes.some((route) => route.path === to.path);
  const isFound = routes.some((route) => route.path === to.path);
  document.title = "Instabug | " + to.name;

  if (!isFound) {
    next({ name: "404", path: "/404" });
  } else {
    if (to.name === "404") next();
    if (!isRoutePublic && !token) next({ name: "Login", path: "/login" });
    if (isRoutePublic && token) next({ name: "Wellecome", path: "/" });
    else next();
  }
});

export default router;
