import express from "express";
import { MongoClient } from "mongodb";
import { atlasURL } from "../config/mongodb.js";

// atlas 접속
// new 키워드를 사용하여 MongoClient 클래스를 통해
// client  객체를 생성
// mongoDB에 연결하기위한 준비도구
const client = new MongoClient(atlasURL);
// BBS(bbs라는 이름으로) Collection 시작
const BBS = client.db().collection("bbs");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const bbs = {
    b_date: "2022-11-22",
    b_time: "10:36:00",
    b_write: "Kyoungmin",
    b_title: "게시판 시작",
    b_content: "게시판을 작성합시다",
  };
  try {
    const result = await BBS.insertOne(bbs);
    return res.json(result);
  } catch (err) {
    res.json(err);
  }
  // res.render("index", { title: "callor.com Express" });
});

export default router;
