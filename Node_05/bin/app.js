import express from "express";
import path from "path";
import logger from "morgan";

import calcRouter from "../Routes/router.js";
import dbRouter from "../Routes/db.js";
const app = express();

app.use("/", (req, res, next) => {
  console.log("안녕하세요 반갑습니다");
  next();
});

app.use(logger("dev"));

//express에 포함된 미들웨어 설정
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join("./public")));

// project/views 폴더를 views이름으로 세팅
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(path.join("./public", "images", "bak.jpg"));
});

//RequestMapping과 router를 연결하기
app.use("/calc", calcRouter);
app.use("/country", dbRouter);
export default app;
