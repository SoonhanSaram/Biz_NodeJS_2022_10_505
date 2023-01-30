import express from "express";
import { getBooks } from "../../../Node_200_Naver_V2/modules/naver_modules.js";
import { bookinput } from "../../modules/books_modules.js";
import {
  BOOK_RES,
  NAVER_RES,
  system_error,
  USER_RES_CODE,
} from "../../config/api_res_code.js";

import { getMyBooks } from "../../modules/books_modules.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const search = req.query?.search;
  if (!search) {
    return res.json(NAVER_RES.NOT_SEARCH);
  }

  let resultBooks;
  try {
    resultBooks = await getBooks(search);
  } catch (error) {
    return res.json(JSON.parse(error.message));
  }

  return res.json(resultBooks);
});

router.get("/my/:username", async (req, res) => {
  const username = req.params.username;
  console.log(username);
  const myBooks = await getMyBooks({ username });
  return res.json(myBooks);
});

router.post("/insert", async (req, res) => {
  const { username, book } = req.body;
  console.log(username, book);
  // isbn 으로 다시 서버에 fetch 해 도서정보를 받아오고
  // 그 정보를 tbl_books 에 insert

  // book 정보를 통째로 client 에서 받는다면
  // 그 정보를 그대로 tbl_books 에 insert
  try {
    await bookinput(book, username);
  } catch (error) {
    console.log(error);
    return res.json(system_error.FETCH_ERROR);
  }
});
router.get("/detail/:isbn", async (req, res) => {});
router.get("/user/:username", async (req, res) => {});

export default router;
