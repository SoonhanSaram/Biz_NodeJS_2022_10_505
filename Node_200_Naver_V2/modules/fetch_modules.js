import Naver from "../config/naver_config.js";

const getBooks = async (search) => {
  console.log(search);
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
    /**
     * 오류처리를 다른곳으로 일임하기
     */
    throw new Error(response.json());
  }

  let result = null;
  try {
    result = await response.json();
  } catch (error) {
    console.log("JSON 변환 오류", error);
    throw new Error("JSON 변환 오류");
  }
  const result_replace = result.items.map((item) => {
    return { ...item, author: item.author.replaceAll("^", " ") };
  });

  return result_replace;
};

export { getBooks };
