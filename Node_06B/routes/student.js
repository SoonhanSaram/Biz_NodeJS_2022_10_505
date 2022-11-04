import express from "express";
import mysql from "../modules/mysqlDB.js";
const router = express.Router();

router.get("/", (req, res) => {
  let st_name = req.query.st_name;
  let sql = "SELECT * FROM tbl_student ORDER BY st_num ";
  if (st_name) {
    sql = `SELECT * FROM tbl_student WHERE st_name LIKE CONCAT ('%', ?, '%') ORDER BY st_num`;
  } else {
    st_name = "";
  }
  mysql.execute(sql, [st_name], (err, students, f) => {
    //   res.json(students);
    res.render("student/st_main", { body: "list", students });
  });
});
router.get("/insert", (req, res) => {
  res.render("student/st_main", { body: "write" });
});

router.post("/insert", (req, res) => {
  const student = req.body;
  console.log(student);
  const sql = `INSERT INTO tbl_student( st_num, st_name, st_dept, st_grade, st_tel, st_addr) values (?,?,?,?,?,?)`;
  mysql.execute(sql, Object.values(student), (err, result, f) => {
    if (err) {
      console.error(err);
    }
    // post /student/insert
    // 코드가 여기까지 실행되면 추가된 학생정보가
    // 잘 추가되었는 지 확인하기 위하여 다시 학생정보List를 보여줘야한다
    // 이미 학생정보 List를 보여주는 Router를 만들어뒀다
    // 다시 여기에서 List SELECT하여 보여주는 코드를 작성하는 대신
    // Server의 Router에서 Web Browser에게 요청을 한다
    // 이미 List를 보여주는 Router(RequestMapping)가 있으니
    // 다시 한번 요청을 해달라
    res.redirect(`/student?st_name=${student.st_name}`);
  });
});
export default router;
