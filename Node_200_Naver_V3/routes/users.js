import express, { json } from "express";
import { userJoin, userLogin } from "../modules/users_module.js";

const router = express.Router();

router.get("/join", async (req, res, next) => {
  const USER = {
    username: "",
    password: "",
    realname: "",
    nickname: "",
    email: "",
    tel: "",
    addr: "",
  };
  return res.render("users/join", { ERROR: "", USER: USER });
});

router.post("/join", async (req, res) => {
  try {
    await userJoin(req.body);
    return res.redirect("/");
  } catch (e) {
    return res.render("users/join", {
      ERROR: JSON.parse(e),
      USER: req.body,
    });
  }
});

router.get("/login", async (req, res) => {
  // ?error=LOGIN 요청을 하면
  // LOGIN_MSG = {"LOGIN":"LOGIN"}
  const LOGIN_MSG = { [req.query.error]: req.query.error };
  const USER = {
    username: "",
    password: "",
  };
  return res.render("users/login", {
    ERROR: { CODE: 0 },
    USER: USER,
    LOGIN_MSG,
  });
});

router.post("/login", async (req, res) => {
  let resultUser = {};
  try {
    resultUser = await userLogin(req.body);
    // session 에 데이터를 저장할 때는 민감정보는 삭제한다.
    resultUser.password = null;
    req.session.user = resultUser;
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("users/login", {
      ERROR: JSON.parse(error.message),
      USER: req.body,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.user = null;
  const sendStr = `
  <script>
    alert("로그아웃 되었습니다")
    document.location.href = "/"
  </script>`;
  return res.send(sendStr);
});

export default router;
