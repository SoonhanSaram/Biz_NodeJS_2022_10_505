import DB from "../models/index.js";
import { system_error } from "../config/error.code.js";
import { USER_RES_CODE } from "../config/api_res_code.js";
import crypto from "crypto";

const USER = DB.models.tbl_users;

export const userJoin = async (user) => {
  // console.log(user);
  const { username, password, re_password } = user;
  // USERNAME 입력하지 않았을 때
  if (!username) throw new Error(JSON.stringify(USER_RES_CODE.REQ_USERNAME));
  let resultUser;
  // user 중복검사
  try {
    resultUser = await USER.findByPk(username);
  } catch (error) {
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
  if (resultUser) {
    throw new Error(JSON.stringify(USER_RES_CODE.OVERLAP_USERNAME));
  }
  // 비번을 입력하지 않았을 때
  if (!password) throw new Error(JSON.stringify(USER_RES_CODE.REQ_PASSWORD));

  // 비번 확인을 입력하지 않았을 때
  if (!re_password)
    throw new Error(JSON.stringify(USER_RES_CODE.REQ_RE_PASSWORD));

  // 비밀번호와 확인이 일치하지 않았을 때
  if (password != re_password)
    throw new Error(JSON.stringify(USER_RES_CODE.MATCH_NOT_RE_PASSWORD));

  /**
   * 비밀번호 암호화
   */
  const encPassword = crypto
    .createHash("sha512") // 암호화 알고리즘
    .update(user.password) // 평문 암호(입력된 암호)
    .digest("base64"); // 인코딩

  user.password = encPassword;

  /**
   * user table 의 u_level 칼럼 활용
   * 최초로 회원가입을 하면 그 사용자는 ADMIN 이다. level 은 0
   * 두번째 사용자부터는 guest 또는 일반 사용자 level 은 9
   */

  try {
    const userCount = await USER.count(); // 데이터의 개수 select
    // console.log(userCount);

    if (userCount) {
      user.u_level = 9;
    } else {
      user.u_level = 0;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }
  console.log(user);
  try {
    await USER.create(user);
  } catch (error) {
    console.log("User Create");
    throw new Error(JSON.stringify(USER_RES_CODE.OVERLAP_USERNAME));
  }
}; // userJoin End

export const userLogin = async (user) => {
  const { username, password } = user;
  let findUser = {};
  if (!username) throw new Error(JSON.stringify(USER_RES_CODE.REQ_USERNAME));
  try {
    findUser = await USER.findByPk(username);
  } catch (error) {
    console.log("Find User 에러");
    throw new Error(JSON.stringify(system_error.SQL_ERROR));
  }

  if (!findUser)
    throw new Error(JSON.stringify(USER_RES_CODE.MATCH_NOT_USERNAME));

  if (!password) throw new Error(JSON.stringify(USER_RES_CODE.REQ_PASSWORD));

  const encPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  if (encPassword !== findUser.password) {
    throw new Error(JSON.stringify(USER_RES_CODE.MATCH_NOT_PASSWORD));
  }

  return findUser;
};
