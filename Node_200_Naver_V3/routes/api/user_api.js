import express from "express";
import { user_res_code } from "../../config/api_res_code.js";
import { system_error } from "../../config/api_res_code.js";
import crypto from "crypto";
import DB from "../../models/index.js";

const router = express.Router();
const USER = DB.models.tbl_users;

// 로그인하기
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  let findUser = null;
  try {
    findUser = await USER.findByPk(username);
  } catch (error) {
    return res.json(user_res_code.SYSTEM_SQL_ERROR);
  }
  if (!findUser) return res.json(user_res_code.MATCH_NOT_USERNAME);
  const encPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  if (findUser.password !== encPassword) {
    return res.json(user_res_code.MATCH_NOT_PASSWORD);
  }
  req.session.user = findUser;
  return res.json({ ...user_res_code.OK, MSG: findUser });
});

router.get("/session", async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.json(user_res_code.CAN_NOT_FIND_SESSION);
  return res.json({ ...user_res_code.OK, MSG: user });
});

// 회원가입
router.post("/join", async (req, res) => {});

// 로그인한 사용자 정보 get
router.get("/info", async (req, res) => {});

export default router;
