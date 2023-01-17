import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_users;
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
  const { username, password, re_password } = req.body;

  const resultError = {
    CODE: 0,
    MESSAGE: "",
  };
  if (!username) {
    resultError.CODE = 1;
    resultError.MESSAGE = "USERNAME은 필수 항목";
    return res.render("users/join", { ERROR: resultError, USER: req.body });
  }

  if (!password) {
    resultError.CODE = 2;
    resultError.MESSAGE = "비밀번호는 반드시 입력해 주세요";
    return res.render("users/join", { ERROR: resultError, USER: req.body });
  }
  if (!re_password) {
    resultError.CODE = 3;
    resultError.MESSAGE = "비밀번호는 반드시 입력해 주세요";
    return res.render("users/join", { ERROR: resultError, USER: req.body });
  }
  if (password != re_password) {
    resultError.CODE = 4;
    resultError.MESSAGE = "비밀번호를 확인해 주세요";
    return res.render("users/join", { ERROR: resultError, USER: req.body });
  }

  /**
   * 비밀번호 암호화
   */
  
});
export default router;
