import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const countrySelect = "SELECT * from country LIMIT 0 ,10";
  mysql.query(countrySelect, (err, result, f) => {
    /**
     * 국가 = {code, name, ...}
     * result = [{국가},{국가},{국가}]
     * result에 담긴 data를 countrys라는 이름으로 바꿔서 저장저장
     */
    //res.json(result);
    res.render("country", { countrys: result });
  });
});
// 주소창에(메뉴클릭) http://localhost:3000/country/list 입력하고
// enter를 눌렀을 때 처리하는 URI
// 메뉴에서 link를 클릭했을 때 처리하는 URL
router.get("/list", (req, res) => {
  res.render("country", { countrys: [] });
});

router.post("/list", (req, res) => {
  //form의 input에 설정된 name(C_name) 변수값을 set
  //name변수에 저장

  const name = req.body.c_name;

  const sql = " SELECT * FROM country WHERE name LIKE CONCAT('%' ? '%') ";
  mysql.execute(sql, [name], (err, countrys, f) => {
    res.render("country", { countrys });
  });
});
router.get("/:na/get", (req, res) => {
  const countryname = req.params.na;

  const countrySelect = " SELECT name from country where name = ? ";

  mysql.execute(countrySelect, [countryname], (err, result, f) => {
    // res.json(result);
    res.render("country", { countrys: result });
  });
});

router.get("/:nam/like", (req, res) => {
  const countryname = req.params.nam;

  const countrySelect =
    "SELECT name from country where name like concat('%' '?' '%') ";

  mysql.execute(countrySelect, [countryname], (err, result, f) => {
    //res.json(result);
    res.render("country", { countrys: result });
  });
});

export default router;
