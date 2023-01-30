import express from "express";
import { getBooks } from "../../modules/naver_modules.js";
import { getMyBooks } from "../../modules/books_modules.js";
import Books from "../../modules/books_modules.js";
import moment from "moment";
import DB from "../../models/index.js";
//
const BOOKS = DB.models.tbl_books;
// const MY_BOOKS = DB.models.tbl_mybooks;
// const USERS = DB.models.tbl_users;
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
  book.odate = moment().format("YYYY[-]MM[-]DD");
  return res.render("book/detail", { BOOK: book });
});

router.post("/insert", async (req, res, next) => {
  /**
   * 로그인한 사용자 정보를 사용해 도서 정보 만들기
   * tbl_books 테이블은 일반적인 도서정보가 저장
   * tbl_mybooks 테이블은 도서정보 + 사용자 정보를 저장
   *    Relation 이라 함
   */

  // session 에서 로그인한 사용자 정보 추출
  const user = req?.session?.user;

  const book = req.body;
  try {
    await Books.bookinput(book, user);
  } catch (error) {
    const Error = JSON.parse(error.message);
    return res.json(Error);
  }

  // 도서정보를 book_module.js 의 bookInput() 에게 이전

  return res.redirect("/list");
});
router.get("/user", async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.redirect("/users/login?error=LOGIN");

  try {
    const result = await Books.getMyBooks(user);

    return res.render("book/list", { BOOKS: result });
  } catch (error) {
    return res.send("도서정보 불러오기 오류");
  }
});
export default router;
