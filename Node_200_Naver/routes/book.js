import express from "express";
import { getBooks } from "../modules/fetch_modules.js";
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
  const book = req.body;
  const my_book = {
    my_username: "kkm9596",
    my_isbn: req.body.isbn,
    my_odate: req.body.odate,
    my_oprice: req.body.discount,
  };

  const user = {
    username: "kkm9596",
    password: "123",
    u_name: "순한",
    u_level: 0,
  };
  // user 정보를 추가할 때 오류가 발생하면 통과
  try {
    await USERS.create(user);
  } catch (error) {
    console.log(error);
  }

  console.log(my_book);
  try {
    await BOOKS.create(book);
  } catch (error) {
    console.log(error);
    try {
      // create를 실패하면 update를 다시한번 시도
      await BOOKS.findByPk(book.isbn);
    } catch (e) {
      console.log(e);
      return res.send("도서정보 저장 오류 발생");
    }
  }

  try {
    await MY_BOOKS.create(my_book);
  } catch (error) {
    try {
      // create를 실패하면 update를 다시한번 시도
      await MY_BOOKS.update(my_book, {
        where: {
          [Op.and]: [
            { my_isbn: my_book.my_isbn },
            { my_username: my_book.my_username },
          ],
        },
      });
    } catch (error) {
      return res.send("11 도서정보 저장 오류 발생");
    }
  }

  try {
    const mybooks = await MY_BOOKS.findAll();
    const books = await BOOKS.findAll();
    const user = await USERS.findAll();
    res.redirect("/book");
  } catch (error) {
    return res.send("SELECT 오류");
  }
});
export default router;
