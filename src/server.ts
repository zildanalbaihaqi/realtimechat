import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import handleConnection from "@/handler/connection";

dotenv.config();

const PORT = 3020;
const server = new WebSocketServer({ port: PORT });

console.log(`Relay WebSocket server listening on ws://localhost:${PORT}`);
server.on("connection", handleConnection);
