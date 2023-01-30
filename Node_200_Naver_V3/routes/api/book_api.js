import express from "express";
import { getBooks } from "../../../Node_200_Naver_V2/modules/naver_modules.js";
import { getMyBooks } from "../../modules/books_modules.js";
const router = express.Router();

router.get("/search", async (req, res) => {
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

router.get("/my/:username", async (req, res) => {
  const username = req.params.username;
  console.log(username);
  const myBooks = await getMyBooks({ username });
  return res.json({ MYBOOKS: myBooks });
});

router.post("/input", async (req, res) => {});
router.get("/detail/:isbn", async (req, res) => {});
router.get("/user/:username", async (req, res) => {});

export default router;
