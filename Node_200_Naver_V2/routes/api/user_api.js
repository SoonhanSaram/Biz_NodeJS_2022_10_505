import express from "express";

const router = express.Router();

// 로그인하기
router.post("/join", async (req, res) => {});
router.post("/login", async (req, res) => {});

// 로그인한 사용자 정보 get
router.get("/info", async (req, res) => {});

export default router;
