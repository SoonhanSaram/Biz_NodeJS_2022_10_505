import express from "express";
import { getBooks } from "../modules/naver_modules.js";
import Books from "../modules/books_modules.js";
import DB from "../models/index.js";
import { Op } from "sequelize";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;
const router = express.Router();

router.get("/", async (req, res, next) => {
  const search = req.query.search;
  if (!search) {
    return res.render("book/list", { BOOKS: [] });
  }

  /**
   * getBooks()함수에서 throw new Error() 가 실행되면
   * getBooks()함수 모듈에서 throw 로 넘겨진 error 는 여기서 처리된다
   */
  try {
    const result_replace = await getBooks(search);
    return res.render("book/list", { BOOKS: result_replace });
  } catch (error) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/detail/:isbn", async (req, res, next) => {
  const result = await getBooks(req.params.isbn);
  const book = result[0];
  book.price = Number(book.discount) / 0.9;
  return res.render("book/detail", { BOOK: book });
});

router.post("/insert", async (req, res, next) => {
  const user = {
    username: "kkm9596",
    password: "123",
    u_name: "순한",
    u_level: 0,
  };

  const book = req.body;
  try {
    await Books.bookinput(book, user);
  } catch (error) {
    console.log(error);
    return res.json({ mgs: "오류 발생", error: e });
  }

  // 도서정보를 book_module.js 의 bookInput() 에게 이전

  return res.send("SELECT 오류");
});
export default router;
