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
  res.render("student/st_main", { body: "write", student: {} });
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

router.get("/:st_num/detail", (req, res) => {
  const st_num = req.params.st_num;
  /**
   * DB SQL을 코딩할 때 주의사항
   * 아래와 같이 문자열을 직접 코딩하여
   * WHERE절을 만들경우
   * 예를 들어 S or 1=1과 같은 문자열을 st_num 변수에 담아서 전달을 하면
   * WHERE의 조건이 무력화되는 명령이 실행된다
   * 만약, DELETE, UPDATE명령을 수행할 때 이러한 코드를
   * 작성하면 해커에의해 DB가 바로 손상될 수 있다
   *
   * 이러한 해킹 공격을 DB INJECTION공격이라고 한다
   */
  // const sql = 'SELECT * FROM tbl_student WHERE st_num = ${st_num}'
  const sql = `SELECT * FROM tbl_student WHERE st_num = ?`;
  mysql.execute(sql, [st_num], (err, student, f) => {
    // res.json(student);
    res.render("student/st_main", { body: "detail", student });
  });
});

/**
 * 1. /student/학번/update로 Request가 되면
 * 2. DB에서 학생정보를 SELECT하고
 * 3. st_write로 보내서 input box에 정보를 표시
 */

router.get("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  const sql = `SELECT * FROM tbl_student WHERE st_num =?`;
  mysql.execute(sql, [st_num], (err, student, f) => {
    res.render("student/st_main", { body: "write", student: student[0] });
  });
});

router.post(`/:st_num/update`, (req, res) => {
  const { st_name, st_dept, st_grade, st_tel, st_addr, st_num } = req.body;

  const sql = `update tbl_student set st_name = ?, st_dept = ?, st_grade = ?, st_tel = ?, st_addr = ?  where  st_num = ?`;
  mysql.execute(
    sql,
    [st_name, st_dept, st_grade, st_tel, st_addr, st_num],
    (err, student, f) => {
      res.redirect(`/student/${st_num}/detail`, { student: student[0] });
    }
  );
});
export default router;
