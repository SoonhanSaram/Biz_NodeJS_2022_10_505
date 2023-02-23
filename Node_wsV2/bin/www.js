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
const clientList = [];
const rooms = [];

function heartbeat() {
  this.isAlive = true;
}
const joinFunc = (ws, id, data) => {
  console.log(data.room);
  clients.set(id, { client: ws, room: data.room });
  console.log(clients);
  const users = clientList?.map((client) => client[id]);
  wss.clients.forEach((client) => {
    if (client && client.roomid === data?.roomId) {
      client.send(JSON.stringify({ type: "users", users }));
    }
  });
};

// When a client connects, add them to the Map
wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    let id = "";

    let data = JSON.parse(message);
    console.log(data);
    if (data.type === "id") {
      id = data.id;
      clients.set(id, { client: ws, room: "" });
      clientList.push(clients);
      console.log(clientList);
      data = "";
    }
    if (data.type === "roomId") {
      rooms.push(data.roomId);
      if (rooms !== null) {
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(rooms));
        });
      }
    }
    if (data.type === "roomList") {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(rooms));
      });
    }
    if (data.type === "join") {
      joinFunc(id, ws, data);
    }
    if (data.type === "chat") {
      wss.clients.forEach((client) => {
        if (client && client.roomid === data.roomId) {
          const payload = { ...data, id: clients[id] };
          client.send(JSON.stringify(payload));
        }
      });
    }
    if (data.type === "exit") {
      clients.set(id, { roomId: data.roomId });
      wss.clients.forEach((client) => {
        if (client && client.roomid === data?.roomId) {
          client.send(
            JSON.stringify({ type: "exitMessage", user: clients[id] })
          );
        }
      });
      clients.set("roomid", null);

      wss.clients.forEach((client) => {
        if (client.roomid === data.roomId) return client;
      });

      joinFunc(id, data);
    }
  });

  // if (req.url.startsWith("/rooms")) {
  //   clients.set(ws, "rooms");
  //   ws.send(JSON.stringify({ type: "id", data: id }));
  //   ws.on("message", (message) => {
  //     const data = JSON.parse(message);
  //     rooms[id] = data.roomId;
  //     rooms.push(data);
  //     // Send the list of available rooms to the client
  //     wss.clients.forEach((client) => {
  //       if (
  //         client.readyState === WebSocket.OPEN &&
  //         clients.get(client) === "rooms"
  //       ) {
  //         client.send(JSON.stringify({ type: "rooms", data: rooms }));
  //       }
  //     });
  //   });
  // } else if (req.url.startsWith("/chat/")) {
  //   ws.send(JSON.stringify({ type: "list", clientList }));
  //   ws.on("message", (message) => {
  //     const data = JSON.parse(message);

  //     const { type, id, text, roomId } = data;
  //     // console.log(type);
  //     clients[id] = id;
  //     clients.set(ws, roomId);
  //     const roomClients = Array.from(clients.entries())
  //       .filter(([client, clientRoomid]) => clientRoomid === roomId)
  //       .map(([client, clientRoomid]) => client);

  //     if (type === "enter") {
  //       // console.log("엔터");
  //       roomClients.forEach((client) => {
  //         if (client.readyState === WebSocket.OPEN) {
  //           client.send(JSON.stringify({ type, username: clients[id] }));
  //         }
  //       });
  //     }

  //     if (type === "message") {
  //       console.log("메시지");
  //       roomClients.forEach((client) => {
  //         if (client.readyState === WebSocket.OPEN) {
  //           client.send(JSON.stringify({ type, id, text, roomId }));
  //         }
  //       });
  //     }
  //     ws.on("close", () => {
  //       // console.log(clients);
  //       console.log(clients[id]);
  //     });
  //   });
  // }
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
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
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
