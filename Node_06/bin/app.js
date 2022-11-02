import express from "express";
import path from "path";
import logger from "morgan";
import dbrouter from "../routes/schooldb.js";

const app = express();

app.use("/", (req, res, next) => {
  console.log("안녕하세요 반갑습니다");
  next();
});
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join("./views"));
app.set("view engine", "ejs");

app.use("/student", dbrouter);

export default app;
