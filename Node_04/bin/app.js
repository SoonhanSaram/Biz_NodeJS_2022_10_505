import express from "express";
import path from "path";
import logger from "morgan";
import calcRouter from "../Routes/router.js";
const app = express();

app.use("/", (req, res, next) => {
  console.log("안녕하세요 반갑습니다");
  next();
});

app.use(logger("dev"));
app.use("/calc", calcRouter);

//express에 포함된 미들웨어(middleware, 중간자 도구)
// form에서 post method로 데이터를 전송할 때
// 그 데이터를 req.body속성으로부터 Get할 수 있게해주는 도구
app.use(express.urlencoded({ extended: false }));
/**
 * Web browser에서 Request를 보내면
 * http > Express > router의 과정을 거치면서 요청을 처리하고
 * router > express > http > Web Browser로 응답
 *
 * 하지만 static file(이미지, 단순문서, 단순파일 등)은
 * router등에서 연산을 하지 않아도되는 대상이다
 * 이러한 파일들을 static 저장소(../public)에 보관하고
 * 만약 Web Browser에서 요청을 하면
 * router로 보내지 않고, express가 바로 전달을 한다
 */
app.use(express.static(path.join("./public")));

/**
 * path.join()
 * 파일을 핸들링(저장, 열기)할 때 파일의 저장경로(path)를 정확히
 * 지정해주어야 한다.
 * 과거엔 운영체제마다 경로를 지정하는 방식이 달랐다
 * 윈도우에서는 폴더의 구분을 역슬래시(\)를 사용
 * unix, linux, mack에서는 폴더의 구분을 슬래시(/)를 사용하는 등
 * 많은 혼란이 있고, 개발자가 이러한 부분에서 어려움을 겪었다
 * path.join() 함수는 운영체제를 확인하여 자동으로 경로를 오류가 나지 않도록
 * 만들어주는 도구다
 */
app.get("/", (req, res) => {
  console.log(path.join("./public", "images", "bak.jpg"));
});
export default app;
