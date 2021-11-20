import { WebSocketServer } from "ws";

import { Client } from "./client";
import { HangmanWebSocket } from "./typings/HangmanWebSocket";

const wss = new WebSocketServer({
    port: 42337,
});

console.info("Socket server started listening on port 42337");

wss.on("connection", (ws: HangmanWebSocket, request) => {
    ws.client = new Client();

    ws.on("message", (data) => {
    });

    ws.on("pong", () => ws.client.isAlive = true);
});

const heartbeatInterval = setInterval(() => {
    wss.clients.forEach((value) => {
        const ws: HangmanWebSocket = <HangmanWebSocket> value;

        if (!ws.client.isAlive) {
            console.warn(`Terminating socket for client "${ws.client.id}" because it failed to respond in time`)
            return ws.terminate();
        }

        ws.client.isAlive = false;
        console.debug(`Checking if client "${ws.client.id}" is still alive`)
        ws.ping();
    });
}, 30000);

wss.on("close", () => clearInterval(heartbeatInterval));