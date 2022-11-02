import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const hostconfig = {
  host: "localhost",
  port: 3000,
};

server.on("listening", () => {
  console.log("Server Start Listening");
  console.log(
    `Web Browser Connect http://${hostconfig.host}:${hostconfig.port}`
  );
});

server.listen(hostconfig);
