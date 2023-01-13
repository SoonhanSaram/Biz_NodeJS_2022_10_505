import express from "express";
import Naver from "../config/naver_config.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const search = req.query.search;
  if (!search) {
    return res.send("검색어를 입력해야 합니다.");
  }
  const naverFetchOption = {
    method: "GET",
    headers: {
      /**
       * 대괄호로 표시한 keyword 는 문자열로 대체되어 전송됨
       */
      [Naver.CLIENT_ID.KEY]: Naver.CLIENT_ID.VALUE,
      [Naver.CLIENT_SECRET.KEY]: Naver.CLIENT_SECRET.VALUE,
    },
  };
  const queryString = `${Naver.BOOK_URL_JSON}?query=${search}`;
  let response = null;

  try {
    response = await fetch(queryString, naverFetchOption);
  } catch (error) {
    console.log(`fetch ${error}`);
    return res.json(response.json());
  }

  let result = null;
  try {
    result = await response.json();
  } catch (error) {
    console.log("JSON 변환 오류", error);
    return res.send("JSON 변환 과정에서 오류");
  }
  const result_replace = result.items.map((item) => {
    return { ...item, author: item.author.replaceAll("^", " ") };
  });
  //return res.json(result);
  return res.render("book/list", { BOOKS: result_replace });
});

export default router;
