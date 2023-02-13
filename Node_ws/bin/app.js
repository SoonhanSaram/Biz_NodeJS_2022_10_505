/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2023-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";
import session from "express-session";
// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// MySQL Sequelize
import DB from "../models/index.js";

// sample router modules
import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";

// create express framework
const app = express();

DB.sequelize.sync({ force: true }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

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
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "secret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.set("db", { rooms: new Array(), users: new Array() });

// router link enable
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/newroom", (req, res) => res.render("new"));
app.post("/newroom", (req, res) => {
  const { title } = req.body;
  const roomId = req.sessionID + Date.now();
  const { rooms } = app.get("db");
  rooms.push({ title, roomId });
  app.get("wss").clients.forEach((client) => {
    if (client.location === "index" && client.readyState === client.OPEN)
      client.send(JSON.stringify(rooms));
  });
  return res.redirect(`/chat/${roomId}`);
});

app.get("/chat/:roomId", (req, res) => {
  const { title } = app
    .get("db")
    .rooms.find((room) => room.roomId === req.params.roomId);
  res.locals.title = title;
  res.render("chat");
});

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
const expressServer = app.listen(app.get("port"), () =>
  console.log(`ws module server is running on port + app.get('port')`)
);

require("./socket.js")(expressServer, app);
export default app;
