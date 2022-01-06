<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MainView",

    created() {
        this.$socket.connect("ws://localhost:42337");
        this.$socket.on("message", ev => console.debug(ev));
    },
    methods: {
        sendMessage(message: string) {
            this.$socket.send(message);
        },
    },
    setup() {
    },
});
</script>

<template>

    <p>Main</p>

</template>