export const OK_RES = {
  CODE: "OK",
  CODE_NUM: 200,
  MESSAGE: {},
};
export const USER_RES_CODE = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    CODE_NUM: 400,
    SUB_CODE: "USERNAME",
    MESSAGE: "ESSENTIALLY NEED USERNAME",
  },
  MATCH_NOT_USERNAME: {
    CODE: "MATCH_NOT_USERNAME",
    CODE_NUM: 401,
    SUB_CODE: "USERNAME",
    MESSAGE: "USERNAME CAN NOT FIND",
  },
  DOSE_NOT_EXIST_USERNAME: {
    CODE: "DOES_NOT_EXIST_USERNAME",
    CODE_NUM: 500,
    SUB_CODE: "USERNAME",
    MESSAGE: "USERNAME CAN NOT FIND",
  },
  OVERLAP_USERNAME: {
    CODE: "OVERLAP_USERNAME",
    CODE_NUM: 401,
    SUB_CODE: "USERNAME",
    MESSAGE: "ALREADY REGISTED USERNAME",
  },
  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "ESSENTIALLY NEED PASSWORD",
  },
  MATCH_NOT_PASSWORD: {
    CODE: "MATCH_NOT_PASSWORD",
    CODE_NUM: 401,
    SUB_CODE: "PASSWORD",
    MESSAGE: "INCORRECT PASSWORD",
  },
  REQ_RE_PASSWORD: {
    CODE: "REQ_RE_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "PLEASE WRITE RE PASSWORD ",
  },
  MATCH_NOT_RE_PASSWORD: {
    CODE: "REQ_RE_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "DOES NOT MATCH PASSWORD ",
  },
  CAN_NOT_FIND_SESSION: {
    CODE: "CAN_NOT_FIND_SESSION",
    CODE_NUM: 403,
    MESSAGE: "로그인 정보 없음",
  },
  LOGIN_FAIL: {
    CODE: "LOGIN_FAIL",
    CODE_NUM: 403,
    MESSAGE: "TOUCH TO ADMIN, YOU DON'T ACSESS",
  },
  SYSTEM_SQL_ERROR: {
    CODE: "SYSTEM_SQL_ERROR",
    CODE_NUM: 500,
    MESSAGE: "SQL 오류 발생",
  },
};
export const BOOK_RES = {
  BOOK_NOT_CREATE: {
    CODE: "BOOK_NOT_CREATE",
    CODE_NUM: 500,
    MESSAGE: "도서 정보를 저장할 수 없습니다.",
  },
  MYBOOK_NOT_CREATE: {
    CODE: "MYBOOK_NOT_CREATE",
    CODE_NUM: 500,
    MESSAGE: "내도서 정보를 저장할 수 없습니다.",
  },
  BOOK_NOT_FOUND: {
    CODE: "BOOK_NOT_FOUND",
    CODE_NUM: 404,
    MESSAGE: "도서 정보를 찾을 수 없습니다.",
  },
  MYBOOK_NOT_FOUND: {
    CODE: "MYBOOK_NOT_FOUND",
    CODE_NUM: 404,
    MESSAGE: "내도서 정보를 찾을 수 없습니다.",
  },
};

export const NAVER_RES = {
  NOT_SEARCH: {
    CODE: "NOT_SEARCH",
    CODE_NUM: 400,
    MESSAGE: "검색어가 없습니다",
  },
  NOT_FOUND: {
    CODE: "NOT_FOUND",
    CODE_NUM: 404,
    MESSAGE: "조회 결과가 없습니다",
  },
};
export const system_error = {
  SQL_ERROR: { CODE: "SQL_ERROR", CODE_NUM: 500, MESSAGE: "SQL ERROR" },
  FETCH_ERROR: {
    CODE: "FETCH_ERROR",
    CODE_NUM: 500,
    MESSAGE: "CAN NOT REQUEST API SERVER",
  },
  JSON_ERROR: {
    CODE: "JSON_ERROR",
    CODE_NUM: 500,
    MESSAGE: "TRANSFORMING TO JSON ERROR ",
  },
  INTERNAL_ERROR: {
    CODE: "INTERNAL_ERROR",
    CODE_NUM: 500,
    MESSAGE: "내부 오류",
  },
};