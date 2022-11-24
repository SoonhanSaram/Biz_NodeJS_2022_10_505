/**
 * mongoDB를 사용하여 BBS(게시판) 데이터를 저장하는
 * ORM(ODM) Model 선언
 */
import mongoose from "mongoose";
import commentModel from "./tbl_comment.js";

const bbsModel = mongoose.Schema({
  b_date: String,
  b_time: String,
  b_write: String,
  b_subject: String,
  b_content: String,
  b_count: Number,
  /**
   * bbs model에 comment Model을 sub Document 배열 형식으로
   * 추가해 1:N의 table 연관 (Association)관계를 설정
   * RDBMS에서는 2개의 table을 생성하고 각 각의 table을
   * Join하는 연관관계를 생성
   * 하지만 mongoDB에서는 Model선언부만 별도로 만들뿐
   * 실제 데이터는 tbl_bbs Collection에 함꼐 저장
   */
  b_comments: [commentModel],
});

/**
 * bbsModel에 설정된 칼럼 정보를 사용하여
 * tbl_bbs Collection(table에 해당)을 사용
 */
export default mongoose.model("tbl_bbs", bbsModel);
