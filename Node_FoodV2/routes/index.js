import {
  TD_select_ALL,
  TD_Find_BY_ID,
  TD_Insert,
  TD_Update,
  TD_Delete,
  TD_date_list,
  TD_cal_list,
  TD_calsum_list,
  TD_Insert_OR_Update,
} from "../modules/food_CRUD.js";
import mysqlconn from "../modules/mysqldb.js";
import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  mysqlconn.execute(TD_select_ALL, (err, todays, field) => {
    res.render("index", { todays });
  });
});

router.post("/", (req, res) => {
  const { t_date, t_time, t_content, t_qty, t_cal } = req.body;
  /**
   * 배열의 전개연산자을 이용한 배열 합치기
   * arr1 = [1,2,3,4,5]
   * arr2 = [9,8,7,6]
   * arr3 = [...arr1, ...arr2]
   * ? arr3 = [1,2,3,4,5,9,8,7,6]
   */

  const params = [...Object.values(req.body), ...Object.values(req.body)];

  /**
   * MySQL의 TD_Insert_OR_Update을 사용하여
   * insert of update를 실행하려고 하면
   * parameter로 사용되는 배열을 두 번 나열해주어야한다.
   * mysql2 버그
   */

  mysqlconn.execute(TD_Insert_OR_Update, params, (err, result, f) => {
    res.redirect("/");
  });
});
export default router;
