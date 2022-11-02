import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const hostconfig = {
  host: "localhost",
  port: 3000,
};

server.listen(hostconfig);
