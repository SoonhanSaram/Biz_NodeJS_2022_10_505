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
  const s_num = req.body.st_num
  const s_name = req.body.st_name
  const s_dept = req.body.st_dept
  const s_grade = req.body.st_grade
  const s_tel = req.body.st_tel
  const s_addr = req.body.st_addr
  
  
  const stinfos  =[s_num, s_name, s_dept, s_grade, s_tel, s_addr]
  
    
  console.log(stinfos)
  
  
  const sql = "INSERT into tbl_student (st_num, st_name, st_dept, st_grade, st_tel, st_addr) values ?";

  mysql.execute(sql, [stinfos], (err, result, f) => {
    console.log("완료")
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
