import {
  TD_select_ALL,
  TD_Find_BY_ID,
  TD_Insert,
  TD_Update,
  TD_Delete,
  TD_date_list,
  TD_cal_list,
  TD_calsum_list,
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

  mysqlconn.execute(
    TD_Insert,
    [t_date, t_time, t_content, t_qty, t_cal],
    (err, result, f) => {
      res.redirect("/");
    }
  );
});
export default router;
