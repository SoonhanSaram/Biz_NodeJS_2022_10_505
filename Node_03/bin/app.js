/**
 * express framework와 관련된 코드를 별도 module로 분리하기
 */

import express from "express";
// router modules import
import rootRouter from "../routes/root.js";
import userRouter from "../routes/user.js";
import cityRouter from "../routes/city.js";
// app 모듈 생성
const app = express();
app.use("/", (req, res, next) => {
  //   res.send("반갑습니다 나는 NodeJS Web App Server 입니다");
  console.log("Express Req Start");
  next();
});
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/city", cityRouter);
export default app;
