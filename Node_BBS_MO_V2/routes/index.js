import express from "express";
import BBS from "../models/tbl_bbs.js";
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
  res.render("write", { bbs: "" });
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
