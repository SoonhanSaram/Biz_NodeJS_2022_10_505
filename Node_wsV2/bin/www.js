/**
 * http Server Setting
 */
import http from "http";
import app from "./app.js";
import createDebug from "debug";
import WebSocket, { WebSocketServer } from "ws";
import { v4 } from "uuid";
// port number check
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }

  // well Known Port greate then
  if (port >= 1024) {
    return port;
  }
  return false;
};
const portNum = { home: "192.168.0.5", academy: "192.168.4.118" };
const debug = createDebug("node-wsv2:server");
const port = normalizePort(process.env.PORT || "3000");

/**
 * Create HTTP server.
 * http and app(express framework) integration
 */
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map();

const rooms = {};

// When a client connects, add them to the Map
wss.on("connection", (ws, req) => {
  const id = v4();
  clients.set(id, ws);

  // Send the client their ID
  ws.send(JSON.stringify({ type: "id", data: id }));

  if (req.url.startsWith("/rooms/")) {
    //onmessage 로 client side에서 보내는 정보를 받아
    //rooms 정보로 바꿔 보내주기
    ws.on("message", (message) => {
      const data = JSON.parse(message);

      // Send the list of available rooms to the client
      ws.send(JSON.stringify({ type: "rooms", data: Object.keys(rooms) }));
    });
  }

  // When a client sends a message, broadcast it to all other clients in the same room
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const { type, sender, text, roomId } = data;

    if (type === "message") {
      const room = rooms[roomId];
      if (room) {
        room.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type, sender, text, roomId }));
          }
        });
      }
    }
  });

  // When a client joins a room, add them to the list of clients in that room
  ws.on("join", (roomId) => {
    const room = rooms[roomId];
    if (room) {
      room.push(ws);
    } else {
      rooms[roomId] = [ws];
    }
  });

  // When a client disconnects, remove them from the Map and from any rooms they were in
  ws.on("close", () => {
    clients.delete(id);
    Object.keys(rooms).forEach((roomId) => {
      const room = rooms[roomId];
      const index = room.indexOf(ws);
      if (index !== -1) {
        room.splice(index, 1);
      }
    });
  });
});

server.listen(port);

// Event listener for HTTP server "error" event.
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Event listener for HTTP server "listening" event.
server.on("listening", () => {
  const addr = server.address();
  console.log(addr);
  const bind =
    typeof addr === "string"
      ? `address : ${addr.address}, port : ${addr.port}`
      : `address : ${addr.address}, port : ${addr.port}`;
  debug("Http Listening on " + bind);
  console.log(`Http Listening on http://localhost:${addr.port}`);
});
