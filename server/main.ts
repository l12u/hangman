import { WebSocketServer } from "ws";

import { Client } from "./client";
import { HangmanWebSocket } from "./types/HangmanWebSocket";

const wss = new WebSocketServer({
    port: 42337,
});

console.info("Socket server started listening on port 42337");

wss.on("connection", (ws: HangmanWebSocket, request) => {
    ws.client = new Client();

    console.debug(`Opened socket connection for client "${ws.client.id}"`);

    ws.on("message", (data, isBinary) => {
        if (!isBinary) {
            ws.send(data.toString("utf-8"));
        }
    });

    ws.on("pong", () => ws.client.isAlive = true);

    ws.on("close", () => {
        console.debug(`Closed socket for client "${ws.client.id}"`);
    });
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

wss.on("close", () => {
    clearInterval(heartbeatInterval);
});