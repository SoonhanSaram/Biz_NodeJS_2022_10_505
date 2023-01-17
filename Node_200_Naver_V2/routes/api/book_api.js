import express from "express";
import { getBooks } from "../../modules/naver_modules.js";
const router = express.Router();

router.get("/naver", async (req, res) => {
  const search = req.query?.search;
  if (!search) {
    return res.json({ CODE: 404, MSG: "Not Exists Search Text" });
  }

  let resultBooks;
  try {
    resultBooks = await getBooks(search);
  } catch (error) {
    return res.json({ CODE: 500, MSG: "네이버 조회 오류" });
  }

  return res.json({ CODE: 200, MSG: resultBooks });
});

router.post("/input", async (req, res) => {});
router.get("/detail/:isbn", async (req, res) => {});
router.get("/user/:username", async (req, res) => {});

export default router;
