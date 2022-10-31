//  http 도구 import
// commons.js 방식, ES5 이전 방식
// const http = require("http")

// ES5이후의 module 방식
// .json 파일을 만들고 {type: "module"}로 만들어 연결하면
// NodeJS를 ES5이상 언어로 사용할 수 있다.
import http from "http";
const host = "127.0.0.1";
const port = 5000;

/**
 * Number() 실행되어 결과를 만들고
 * 그 결과를 log()함수에 전달
 * 콘솔에 출력
 * Number(), log()는 조건없이 코드가 start되면 즉시 실행된다.
 */
console.log(Number("30"));
const strNum = "30";
const intNum = Number(strNum);
console.log(intNum);

/**
 * click이라는 event가 발생했을 때만
 * 익명함수 (()=>{})가 실행된다
 * if문 같은 명령문이 없지만
 * click이라는 전제조건이 만족되면
 * 함수가 실행된다
 * 위 함수를 Callback함수라고 한다.
 */
// document.addEventListener("click", () => {});

/**
 * http 프로토콜을 사용하여 서버가 정상적으로 생성(createServer)
 * (req,res)=>{} 함수가 실행 (Callback 함수)
 */

const createServerCallback = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello Korea</h1>");
};

const server = http.createServer(createServerCallback);

const listenCallback = () => {
  console.log(`서버시작 http:localhost:${host}`);
};
// host(http://127.0.0.1) 주소에서 기다리기 시작하게 되면, listenCallback 함수 실행
// JS 모든 함수는 1급함수
// 1급 함수는 Callback으로 사용할 수 있고
// 다른 함수에 변수처럼 전달할 수 있다.
server.listen(port, host, listenCallback);
