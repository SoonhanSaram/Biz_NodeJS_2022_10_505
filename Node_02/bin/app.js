/**
 * express framework와 관련된 코드를 별도 module로 분리하기
 */

//express framework 사용준비
import express from "express";

// router modules import
// Node_02/routes 폴더에 있는
// root.js와 user.js를 import하여
// 각 각 rootRouter, userRouter 객체(변수)로 선언
import rootRouter from "../routes/root.js";
import userRouter from "../routes/user.js";

// app 모듈 생성
const app = express();

/**
 * Node+Express Server에 오는 모든 요청(Request)을
 * 일단 수신하는 함수
 * 여기에는 expresss server를 사용하는데 필요한 여러가지 공통 부분을 설정을 할 수 있다
 * 이 함수는 함수가 끝나기전에 반드시 Next()를 실행해야 한다.
 */
app.use("/", (req, res, next) => {
  //   res.send("반갑습니다 나는 NodeJS Web App Server 입니다");
  console.log("Express Req Start");
  next();
});

// Request Routing 하기
// Request Mapping 하기
// http://localhost:3000/ 로 요청이 들어오면
// rootRouter(routes/root.js)에게 전달
app.use("/", rootRouter);
// http://localhost:3000/user 로 요청이 들어오면
// userRouter(routes/user.js)에게 전달
app.use("/user", userRouter);

// app.js에서 생성한 module을 다른 module에서
// import 하여 사용할 수 있도록 내보내기
export default app;
