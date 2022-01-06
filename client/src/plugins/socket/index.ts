import { Plugin } from "vue";

import { SocketService } from "./SocketService";

export default {
    install: (app, options) => {
        app.config.globalProperties.$socket = new SocketService();
    },
} as Plugin;