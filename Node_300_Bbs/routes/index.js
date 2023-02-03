import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const BBS = DB.models.tbl_bbs;

/**
 * 전체 데이터 개수 : DB에 저장된 데이터 개수, listTotalCount
 * 한 화면에 보여질 데이터 개수 : 10개, listLimit
 * 페이지 Nav 개수 : 10개 , pageNavCount
 * 보고자 하는 페이지 번호 , pageNum
 */

const pagiNation = {};

router.all("*", async (req, res, next) => {
  const { pageNum, listLimit, pageNavCount } = req.query;

  try {
    pagiNation.listTotalCount = await BBS.count();
  } catch (error) {
    console.log(error);
    return {
      CODE: 500,
      CODE_NAME: "BBS_COUNT_ERROR",
      MESSAGE: "BBS 데이터 개수 SQL 오류",
    };
  }

  pagiNation.listTotalCount = await BBS.count();
  pagiNation.listLimit = Number(listLimit) || 5;
  pagiNation.pageNavCount = Number(pageNavCount) || 5;
  // 전체 데이터를 표현하는데 몇 페이지가 필요한가를 계산
  pagiNation.pageTotalCount = Math.ceil(
    pagiNation.listTotalCount / pagiNation.listLimit
  );
  pagiNation.pageNum = Number(pageNum || 1);
  pagiNation.offset = (pagiNation.pageNum - 1) * pagiNation.listLimit;

  // 화면하단 page nav 를 표현할 개수 중에 시작 nav Num 계산하기
  pagiNation.startNavNum =
    pagiNation.pageNum - Math.floor(pagiNation.pageNavCount / 2);
  pagiNation.startNavNum =
    pagiNation.startNavNum < 1 ? 1 : pagiNation.startNavNum;
  next();
});

/* GET home page. */
router.get("/", async (req, res, next) => {
  const result = await BBS.findAll({
    limit: pagiNation.listLimit,
    offset: pagiNation.offset,
  });

  res.json({ pagiNation, bbsList: result });
  res.render("index", { title: "callor.com Express" });
});

export default router;
