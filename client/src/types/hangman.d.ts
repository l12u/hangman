import { ComponentCustomProperties } from "vue";

import { SocketService } from "@/plugins/socket/SocketService";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $socket: SocketService;
    }
}