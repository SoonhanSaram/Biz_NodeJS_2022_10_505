import DB from "../models/index.js";
import { BOOK_RES } from "../config/api_res_code.js";
const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;

export const bookinput = async (book, username) => {
  // 만약 사용자 정보(username) 값이 없으면 더이상 진행하지 말기
  // 호출한쪽에서 if(!bookInput()) ... 이러한 코드를 return null, retrun false 가
  // 동일한 효과를 냄
  if (!username) return null;

  const my_book = {
    my_username: username, // 로그인 정보가 없으면 null 값 리턴
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_oprice: book.discount,
  };
  // 도서 정보 저장하기
  let bCreateYes = false;
  try {
    await BOOKS.create(book);
    bCreateYes = true;
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

      /**
       * 2023-01-17 변경사항
       * Error exception 을 발생할 때 단순 문자을열을 전달하지 않고
       * JSON 객체 type 의 데이터 전달
       * 이 때, JSON 객체 type 은 Stringify하여 전달
       * Error() 클래스는 문자열만 전달 할 수 있다
       */
      throw new Error(JSON.stringify(BOOK_RES.BOOK_NOT_CREATE));
    }
  }

  // 로그인 정보 누락시 my_books 정보 저장을 못하게 하기
  if (!username) return false;

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
      throw new Error(JSON.stringify(BOOK_RES.MYBOOK_NOT_CREATE));
    }
  }
};

export const getMyBooks = async (user) => {
  const username = user.username;

  let myBooks = null;
  try {
    myBooks = await MY_BOOKS.findAll({
      where: { my_username: username },
      include: "my_isbn_tbl_book",
    });
  } catch (error) {
    console.log(error);
    throw new Error(BOOK_RES.MYBOOK_NOT_FOUND);
  }

  const myBooksInfo = myBooks.map((book) => {
    return book.my_isbn_tbl_book;
  });
  return myBooksInfo;
};

export default { bookinput, getMyBooks };
