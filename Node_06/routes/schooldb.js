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

  stInfos = { num, name, dept, grade, tel, addr };
  const sql =
    "INSERT tbl_student(st_num, st_name, st_dept, st_grade, st_tel, st_addr) values (?)";
  mysql.query(sql, [stInfos], (err, student, f) => {
    res.render("studentdb");
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
