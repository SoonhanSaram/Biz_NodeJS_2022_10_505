/**
 * express generator ES6+ template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2022-11-01
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import { atlasURL } from "../config/mongodb.js";

// sample router modules
import EntranceRouter from "../routes/entrance.js";
import calendarRouter from "../routes/calendar.js";
import detailRouter from "../routes/detail.js";
import usersRouter from "../routes/users.js";
import spcdeInfo from "../routes/spcdeInfo.js";

// create express framework
const app = express();

const dbConn = mongoose.connection;
dbConn.once("open", () => {
  console.log("MongoDB open OK");
});
dbConn.on("error", (err) => {
  if (err) {
    console.error(err``);
  }
});
await mongoose.connect(atlasURL);

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

// router link enable
app.use("/", EntranceRouter);
app.use("/main", calendarRouter);
app.use("/detail", detailRouter);
app.use("/data", spcdeInfo);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
