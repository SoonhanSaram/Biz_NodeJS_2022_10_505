console.log("bin/www");
console.log("nodemon 테스트");

import http from "http";
import serverEvent from "./expressHandler.js";
import app from "./app.js";
const server = http.createServer(app);

const hostConfig = {
  host: "localhost",
  port: 3000,
};

server.listen(hostConfig);
serverEvent(server);

