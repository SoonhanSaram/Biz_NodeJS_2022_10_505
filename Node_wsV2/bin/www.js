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
const sockets = [];

const data = [];
let messageLog = { id: null, ip: null, message: null, room: null };
wss.on("connection", (ws, req) => {
  const id = v4();
  sockets[id] = ws;
  console.log(sockets);

  ws.send(JSON.stringify({ type: "id", id: id }));
  if (req.url.startsWith("/chat/")) {
    ws.onmessage = (message, isBinary) => {
      const query = JSON.parse(message.data);
      messageLog = {
        id: query.id,
        message: query.text,
        room: query.room,
        date: query.date,
        des: "",
      };
      data.push(messageLog);
      console.log(data);

      // 특정 유저와 메시지
      // wss.clients.forEach((client) => {
      // if (client.readyState === WebSocket.OPEN && client !== ws && client) {
      // }
      // });

      // 서버 스트림 메시지
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify(`${query.id} : ${query.text}`, { binary: isBinary })
          );
        }
      });
    };
  }

  ws.on("error", console.error);

  ws.on("open", function open() {
    ws.send("All glory to WebSockets!");
  });

  // ws.on("message", function message(msg) {
  // console.log(msg.toString());
  // });
  ws.on("close", function close(msg) {
    console.log(`서버닫힘 사유 : ${msg}`);
  });
  // ws.onmessage = (e) => {
  // console.log("received: %s", e.data);
  // ws.send("메시지 받아라");
  // };
  // ws.send("something");
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
