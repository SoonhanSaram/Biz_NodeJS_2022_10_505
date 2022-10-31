/**
 * express Router 모듈 선언
 */

import express from "express";

//express module의 Router()함수를 호출하여 router module 생성
const router = express.Router();

router.get("/", (req, res) => {
  res.send("나는 Root Router 입니다");
});

export default router;
