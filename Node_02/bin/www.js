console.log("bin/www");
console.log("nodemon 테스트");

/**
 * NodeJS 프로젝트 시작점(Starting point)
 * NodeJS 프로젝트에서 제일먼저 시작되는 코드
 */

import http from "http";
import serverEvent from "./expressHandler.js";
/**
 * http 방식의 Server에 express Framework연결
 */
// import express from "express";
// const app = express();
// express framework module을 직접 선언하지 않고
// import하여 사용하기
// from "./app.js" : 현재 폴더의 app.js module file을 가져와서
// app이라는 이름으로 사용
import app from "./app.js";
const server = http.createServer(app);
// server.listen(3000, "localhost", () => {
//   console.log("start sever");
// });

// 시작할 host의 ip address와 port를 JSON객체로 선언
const hostConfig = {
  host: "localhost",
  port: 3000,
};
// 서버 연결정보 JSON객체를 매개변수로 전달하여 서버 시작
server.listen(hostConfig);
serverEvent(server);

// routing code를 app.js로 이동
// app.get("/", (req, res) => {
//   res.send("반갑습니다 나는 NodeJS Web App Server 입니다");
// });
