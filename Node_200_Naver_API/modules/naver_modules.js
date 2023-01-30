import Naver from "../config/naver_config.js";
import { NAVER_RES } from "../config/api_res_code.js";
import { system_error } from "../config/api_res_code.js";
export const getBooks = async (search) => {
  if (!search) throw new Error(JSON.stringify(NAVER_RES.NOT_SEARCH));

  // console.log(search);
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
    const response = { ...system_error.FETCH_ERROR, MESSAGE: error.message };
    throw new Error(JSON.stringify(response));
  }

  let result = null;
  try {
    result = await response.json();
  } catch (error) {
    console.log("JSON 변환 오류", error);
    throw new Error(system_error.JSON_ERROR);
  }
  const result_replace = result.items.map((item) => {
    return { ...item, author: item.author.replaceAll("^", " ") };
  });

  return result_replace;
};

// export { getBooks };
