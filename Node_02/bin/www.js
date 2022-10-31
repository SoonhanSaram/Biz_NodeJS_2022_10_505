console.log("bin/www");
console.log("nodemon 테스트");

/**
 * NodeJS 프로젝트 시작점(Starting point)
 * NodeJS 프로젝트에서 제일먼저 시작되는 코드
 */

import http from "http";

/**
 * http 방식의 Server에 express Framework연결
 */
import express from "express";
const app = express();
const server = http.createServer(app);
server.listen(3000, "localhost", () => {
  console.log("start sever");
});

app.get("/", (req, res) => {
  res.send("반갑습니다 나는 NodeJS Web App Server 입니다");
});
