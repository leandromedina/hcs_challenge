import Vue from "vue";
import Router from "vue-router";
import Tasks from "./views/Tasks.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: {
        name: "tasks"
      }
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Tasks
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
