import express from "express";
import path from "path";
import logger from "morgan";
import dbrouter from "../routes/schooldb.js";
import studentRouter from "../routes/student.js";
const app = express();

// express 서버에 middle ware 설정하기
// middle ware : express 서버가 작동되는데 필요한 중간 도구들
app.use(logger("dev"));
// form에서 imput 데이터를 담아 post전송할 때
// 데이터를 수신하고 req.body객체로 변환하는 도구
// extended: false : NodeJS 기본 제공 도구 사용
// extended: true : express 에서 qs라는 외부 도구 사용
app.use(express.urlencoded({ extended: false }));

/**
 * path.join()이 바라보는 폴더
 * 현재 프로젝트는 node ./bin/www.js를 실행한 상태
 * 이 때, 이 명령을 실행한 곳이 project 폴더(Node_06A)
 *
 * path.join("views") 라는 표현은
 * Node_06a/views폴더를 찾으라는 명령
 * path.join()을 공란으로 두면 www.js가 실행된 폴더에서 찾음 *
 */
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

// Node_06a/public 폴더
app.use(express.static(path.join("public")));

// router를 설정한 후에는 아래 코드를 주석처리한다.
app.use("/", (req, res, next) => {
  // res.send, write 같은 코드를 사용하면 다음 코드는 무시한다.
  // res.send("Welcom Express Server");
  // console.log를 사용하고 나서 next()함수를 반드시 사용한다.
  console.log("Express Start");
  next();
});

app.use("/", dbrouter);
app.use("/student", studentRouter);
export default app;
