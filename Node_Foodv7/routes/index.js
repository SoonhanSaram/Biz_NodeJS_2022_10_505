import express from "express";
import moment from "moment";
import db from "../models/index.js";

const Today = db.models.tbl_today;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const todays = await Today.findAll();
  const dateTime = {
    t_date: moment().format("YYYY-MM-DD"),
    t_time: moment().format("hh:mm:ss"),
  };
  res.render("index", { todays, dateTime });
});

router.get("/get/:t_seq", async (req, res, next) => {
  /**
   * select를 할 때
   * PK를 기준으로 조건조회(where select)를 하면
   * 데이터는 1개 이하만 나타난다
   * 다른 칼럼을 기준으로 조건조회를 하면
   * 데이터는 0개 이상의 나타난다
   * 만약 1개만 나타나더라도 이 데이터는 List(배열, 여러개로 인식)
   *
   * PK를 기준으로 조건조회를 할 떄는
   * Today.findOne({where:{t_seq:req.params.t_seq}}) 사용
   * 이 때는 데이터가 List가 아닐 수 있다 (forEach 사용 불가)
   *
   * PK 기준으로 조회할 때 권장하는 함수
   * Today.findByPK(t_seq:req.params.t_seq) 사용
   *
   */
  const todays = await Today.findAll({ where: { t_seq: req.params.t_seq } });
  res.render("index", { todays });
});

router.post("/", async (req, res) => {
  // const { t_seq, t_date, t_time, t_content, t_qty, t_cal } = req.body;

  /**
   * Today.save(req.body)
   * 현재 버전에서 작동이 안됨
   * Insert or Update를 실행하는 코드
   */
  try {
    await Today.create(req.body);
  } catch (err) {
    await Today.update(req.body, { where: { t_seq: req.body.t_seq } });
  }
  res.redirect("/");
});

router.get("/delete/:t_seq", async (req, res) => {
  await Today.destroy({ where: { t_seq: req.params.t_seq } });
  res.redirect("/");
});

export default router;
