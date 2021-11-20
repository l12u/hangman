import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "../views/Main.view.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: MainView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
