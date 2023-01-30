import express from "express";
import { USER_RES_CODE } from "../../config/api_res_code.js";
import { system_error } from "../../config/api_res_code.js";
import { userLogin } from "../../modules/users_module.js";
const router = express.Router();

// 로그인하기
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  try {
    const loginUser = await userLogin(req.body);
    if (!loginUser) return res.json(USER_RES_CODE.LOGIN_FAIL);
    // session 에 user 정보 setting
    req.session.user = loginUser;
    return res.json(loginUser);
  } catch (error) {
    console.log(error?.message);
    return res.json(JSON.parse(error?.message));
  }
});

router.get("/session", async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.json(USER_RES_CODE.CAN_NOT_FIND_SESSION);
  return res.json(user);
});

// 회원가입
router.post("/join", async (req, res) => {});

router.get("/logout", async (req, res) => {
  req.session.user = undefined;
  res.json(null);
});
// 로그인한 사용자 정보 get
router.get("/info", async (req, res) => {});

export default router;
