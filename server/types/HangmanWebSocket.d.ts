import type { WebSocket } from "ws";

import { Client } from "../client";

export type HangmanWebSocket = WebSocket & { client: Client; };