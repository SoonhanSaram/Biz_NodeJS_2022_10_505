import DB from "../models/index.js";
import { Op } from "sequelize";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;

export const bookinput = async (book, user) => {
  const my_book = {
    my_username: user.username,
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_oprice: book.discount,
  };
  // 도서 정보 저장하기
  try {
    await BOOKS.create(book);
  } catch (error) {
    console.log("Book create", error);
    try {
      // create를 실패하면 update를 다시한번 시도
      await BOOKS.findByPk(book.isbn);
    } catch (e) {
      console.log(e);
      // return res.send("도서정보 저장 오류 발생");
      // exception 이 발생하면 exception 상위(호출 한) 모듈로 전가
      // 전달하기, 던지기
      // exception 을 직접 처리하지 않고 상위 모듈로 전달
      throw new Error("도서 정보 저장 오류");
    }
  }
  // 내 도서 정보 저장하기
  try {
    await MY_BOOKS.create(my_book);
  } catch (error) {
    console.log("MyBook, Create", error);
    try {
      // create를 실패하면 update를 다시한번 시도
      await MY_BOOKS.update(my_book, {
        // Op.and 속성대신에 where {조건 1, 조건 2 ...}
        // and 연산자로 인식
        where: {
          my_isbn: my_book.my_isbn,
          my_username: my_book.my_username,
        },
      });
    } catch (error) {
      console.log("mybook update", error);
      //return res.send("11 도서정보 저장 오류 발생");
      throw new Error("내 도서 정보 추가 오류");
    }
  }
};

export default { bookinput };
