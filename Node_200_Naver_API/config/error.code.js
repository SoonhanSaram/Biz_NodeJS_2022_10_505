export const system_error = {
  SQL_ERROR: {
    CODE: "SQL_SYSTEM",
    MESSAGE: "* SQL 오류 관리자에게 문의 해 주세요",
  },
};

export const book_error = {
  BOOK_INSERT_ERROR: {
    CODE: "BOOK_INSERT_ERROR",
    MESSAGE: "* 도서정보 저장오류",
  },
  MY_BOOK_INSERT_ERROR: {
    CODE: "MY_BOOK_INSERT_ERROR",
    MESSAGE: "* 내 도서정보 추가 오류",
  },
};

// 회원가입을 할 때 강제로 발생시킨 Exception 정보
// 회원가입을 할 때 유효성 검사를 하기위한 정보
export const join_error = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    MESSAGE: "* USERNAME 은 반드시 입력해야 합니다",
  },
  OVERLAP_USERNAME: {
    CODE: "OVERLAP_USERNAME",
    MESSAGE: "* 이미 가입된 USERNAME 입니다",
  },
  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    MESSAGE: "* 비밀번호는 반드시 입력해야 합니다",
  },
  REQ_RE_PASSWORD: {
    CODE: "REQ_RE_PASSWORD",
    MESSAGE: "* 비밀번호 확인을 입력해야 합니다",
  },
  MATCH_PASSWORD: {
    CODE: "MATCH_PASSWORD",
    MESSAGE: "* 비밀번호가 일치하는 지 확인해주세요",
  },
};

export const login_error = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    MESSAGE: "* USERNAME 은 반드시 입력해야 합니다",
  },
  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    MESSAGE: "* 비밀번호는 반드시 입력해야 합니다",
  },
  MATCH_USERNAME: {
    CODE: "REQ_USERNAME",
    MESSAGE: "* USERNAME을 확인해주세요",
  },
  MATCH_PASSWORD: {
    CODE: "MATCH_PASSWORD",
    MESSAGE: "* 비밀번호가 일치하는 지 확인해주세요",
  },
};
