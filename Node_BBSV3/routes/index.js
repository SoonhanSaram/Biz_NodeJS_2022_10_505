import express from "express";
import BBS from "../models/tbl_bbs.js";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const bbsResult = await BBS.find();
    // select된 bbs데이터 bbsresult를
    // bbsList변수에 담아서 index에서 rendering
    return res.render("index", { bbsList: bbsResult });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/insert", async (req, res) => {
  // moment를 사용하여 현재 날짜 시각을
  // 지정한 format형식의 문자열로 만들어서
  // 각 각 b_date, b_time칼럼에 추가
  const bbs = new BBS();
  bbs.b_date = moment().format(dateFormat);
  bbs.b_time = moment().format(timeFormat);
  res.render("write", { bbs });
});
router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await BBS.findById(id);
    return res.render("detail", { bbs: result });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await BBS.findById(id);
    return res.render(`write`, { bbs: result });
  } catch (err) {}
});

router.post("/insert", async (req, res) => {
  const newBBs = new BBS(req.body);
  try {
    await newBBs.save();
    res.redirect("/");
  } catch (err) {
    res.json(err);
  }
});
router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // BBS collection에서 _id 칼럼에서 id값으로 찾아 req.body의 값을 setting
    await BBS.updateOne({ _id: id }, { $set: req.body });
    return res.redirect(`/detail/${id}`);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BBS.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    res.json(err);
  }
});
/**
 * router의 reqestmethod
 * post, put, get, delete
 * post : 처음 새로운 데이터를 서버로 보내서 insert요청
 * put : 기존의 데이터를 update요청
 * get : data를 클라이언트에게 요구할 떄
 * delete: 기존 데이터를 삭제할 떄
 */
router.put("/comment/add", async (req, res) => {
  const { id, ct_comment } = req.body;
  const commentData = {
    ct_comment,
    ct_write: "익명",
    ct_date: moment().format(dateFormat),
    ct_time: moment().format(timeFormat),
  };
  // console.log(id, ct_comment);
  try {
    // id에 해당하는 데이터 찾기
    const bbs = await BBS.findById(id);

    // 기존의 댓글에 추가하기
    bbs.b_comments.push(commentData);
    await bbs.save();
    return res.json(bbs);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/input", async (req, res, next) => {
  const bbsContent = {
    b_date: "2022-11-22",
    b_time: "09:36:00",
    b_write: "Kyoungmin",
    b_subject: "Mongoose게시판 시작",
    b_content: "Mongoose게시판 프로젝트",
  };
  try {
    /**
     * bbsContent 데이터(JSON)를 사용하여
     * mongoose 모델객체 bbs를 새로 생성하고
     * 모델객체 bbs의 save()함수를 호출하여
     * 데이터를 추가
     */
    const bbs = new BBS(bbsContent);
    const result = await bbs.save();
    return res.json(result);
  } catch (err) {
    res.json(err);
  }
  // res.render("index", { title: "callor.com Express" });
});

export default router;
