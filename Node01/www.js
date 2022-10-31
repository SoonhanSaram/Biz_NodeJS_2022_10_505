// http Service용 서버를 만드는 도구
import http from "http";
// Web Application Server를 구축하는 도구
// Framework
import express from "express";

const host = "127.0.0.1";
const port = 3000;
// client로부터 요청이 들어왔을 때 실행하는 함수
const createCallback = () => {
  console.log("Server Create");
};

//express framework를 사용하기 위한 도구
const app = express();
//NodeJS의 http 서비스와 express framework를 연동하게
const server = http.createServer(app);

server.listen(port, host, () => {
  console.log("Start Server");
});
/**
 * form에서 POST method로 전송된 데이터를
 * req.body 속성으로 접근하기 위한 설정
 */
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.end(`Hello Root`);
});

app.get("/user/:name", (req, res) => {
  res.setHeader("Content-type", "text/html;charset=UTF-8");
  res.end(`Hello ${req.params.name}`);
});

app.get("/korea", (req, res) => {
  res.end(`Welcome to Korea`);
});

/**
 * form에서 입력된 데이터를 Get method로 받기
 * GET method로 데이터가 전달되면
 * 주소표시줄에 데이터가 노출되어 보안에 매우 취약
 * 또한 전체 문자열의 길이가 255자를 넘으면 데이터가 잘림
 * 암호화 등을 전혀 수행할 수 없다.
 *
 * GET는 주로 데이터를 서버에 요청할 때 사용
 */
app.get("/input", (req, res) => {
  const query = req.query;
  const data = {
    이름: query.name,
    전화번호: query.tel,
    어디로: "오토바이.GET",
  };

  res.json(data);
});
// get 방식 : 데이터를 주소에 얹어서 전송
// post 방식 : 데이터를 body에 담아서 전송(payroad)

/**
 * form에서 입력한 데이터를 POST method로 받기
 * form에서 입력한 데이터를 POST로 보내면
 *         form package의 body영역에 데이터가 포장되어
 *         전송된다.
 * 이 데이터는 일단 주소표시줄에 노출되지 않고 감춰져서
 * 보안에 유리
 * 또한 body영역에 포장된 데이터는 암호화가 비교적 쉽다
 * 따라서 암호화 도구(https)를 사용하면 데이터를 중간에
 *         탈취하기가 어려워진다.
 * body영역에 포장된 데이터는 데이터 용량의 제한이 없다
 *         파일 업로드 등을 할 때는 반드시 POST로 전송
 */
app.post("/input", (req, res) => {
  const body = req.body;
  const data = { 이름: body.name, 전화번호: body.tel, 어디로: "우체국.POST" };
  res.json(data);
});
