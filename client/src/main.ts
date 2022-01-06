import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import SocketPlugin from "@/plugins/socket";

createApp(App)
    .use(store)
    .use(router)
    .use(SocketPlugin)
    .mount("#app");
