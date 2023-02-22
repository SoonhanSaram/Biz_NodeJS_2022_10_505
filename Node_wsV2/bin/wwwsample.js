import http from "http";
import app from "./app.js";
import createDebug from "debug";
import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 1024) {
    return port;
  }

  return false;
};

const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
const debug = createDebug("node-wsv2:server");
const port = normalizePort(process.env.PORT || "3000");

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map();
const rooms = new Map();

function heartbeat() {
  this.isAlive = true;
}

wss.on("connection", (ws, req) => {
  const id = uuidv4();
  clients.set(ws, id);

  ws.isAlive = true;

  ws.on("pong", heartbeat);

  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }, 300);

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "join") {
      const { roomId } = data;

      if (roomId) {
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }

        rooms.get(roomId).add(ws);
      }
    } else if (data.type === "list") {
      const clientList = Array.from(clients.values());

      ws.send(JSON.stringify({ type: "list", clientList }));
    } else if (data.type === "message") {
      const { id, text, roomId } = data;

      const roomClients = rooms.has(roomId)
        ? Array.from(rooms.get(roomId))
        : [];
      roomClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", id, text, roomId }));
        }
      });
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    clearInterval(interval);

    rooms.forEach((clients, roomId) => {
      clients.delete(ws);

      if (clients.size === 0) {
        rooms.delete(roomId);
      }
    });
  });
});

server.listen(port);

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? `address : ${addr.address}, port : ${addr.port}`
      : `address : ${addr.address}, port : ${addr.port}`;

  debug("Http Listening on " + bind);
  console.log(`Http Listening on http://localhost:${addr.port}`);
});
