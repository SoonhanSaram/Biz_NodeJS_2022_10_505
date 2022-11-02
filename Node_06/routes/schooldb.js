import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/list", (req, res) => {
  res.render("studentdb", { student: [] });
});

router.post("/data", (req, res) => {
  const name = req.body.st_name;
  const sql =
    " SELECT * from tbl_student WHERE st_name LIKE concat ('%',?,'%') ";
  mysql.query(sql, [name], (err, student, f) => {
    res.render("studentdb", { student });
  });
});

router.post("/data/add", (req, res) => {
  const num = req.body.st_num;
  const name = req.body.st_name;
  const dept = req.body.st_dept;
  const grade = req.body.st_grade;
  const tel = req.body.st_tel;
  const addr = req.body.st_addr;

  if (!st_num.value) {
    alert("학번을 반드시 입력하세요");
    st_num.value = "";
    return false;
  } else if (!st_name.value) {
    alert("이름을 반드시 입력하세요");
    st_name.value = "";
    return false;
  } else if (4 < st_grade.value || st_grade.valuse > 1) {
    alert("학년은 1~4사이에서 선택하세요");
    st_grade.value = "";
    return false;
  }
  stInfos = { num, name, dept, grade, tel, addr };
  const sql =
    "INSERT tbl_student(st_num, st_name, st_dept, st_grade, st_tel, st_addr) values (?)";
  mysql.query(sql, [stInfos], (err, student, f) => {
    res.render("studentdb", "/");
  });
});

router.get("/data", (req, res) => {
  const selectDB = "SELECT * from tbl_student ";
  mysql.query(selectDB, (err, student, f) => {
    res.render("studentdb", { student });
  });
});

router.get("/data/add", (req, res) => {
  res.render("studentdb_add");
});

export default router;
