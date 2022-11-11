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
router.get("/", async (req, res, next) => {
  /**
   * mysqlConn.promise().execute() 함수가 실행되어
   * 데이터를 select하고
   * select가 완전하게 완료되면 다음 res.render()가 실행되는 것을
   * 보장한다.
   */
  try {
    // mysqlConn.execute() 함수가 실행됐을 때
    // 만약 SQL오류, 서버접속오류가 발생하면
    // exception(예외상황)
    // =MySQL 서버에서 데이터가 정상적으로 도착할 것으로 생각했는데
    //  어떤 문제가 발생하여 그렇지 못하다 라면
    //  이 상황에서 exception이라는 event가 발생
    // exception event는 system에서 발생하는 것으로 if문 등으로 처리를 할 수 없다
    // 보통 exception이 발생하면 코드가 실행을 멈추고 메시지를 console에 보여준다.
    // application을 사용하는 사용자 입장에서는 console메시지를 확인 할 수 없고
    // 중단된 application을 바라만 보게된다.
    // 이러한 상황이 되면 application사용자는 당황하게 된다.
    // 개발자는 이러한 상황을 예측하여 적절한 처리를 해야 한다.
    // 하지만 if문으로 처리가 불가능하기 때문에 대부분의 프로그래밍언어에서는 try{} catch{} 형식의
    // exception event handling 코드를 제공하고 있다.
    // try {exception event가 발생할 가능성이 있는 코드들}
    // catch(event) {exception event가 발생하면 처리할 코드들}
    // 이러한 형식의 코드로 exception을 적절하게 처리해야한다.
    const [todays, f] = await mysqlconn.promise().execute(TD_select_ALL);
    return res.render("index", { todays });
  } catch (err) {
    console.log(err);
    return res.send("오류가 발생함");
  }
});

router.post("/", async (req, res) => {
  // const { t_date, t_time, t_content, t_qty, t_cal } = req.body;
  /**
   * 배열의 전개연산자을 이용한 배열 합치기
   * arr1 = [1,2,3,4,5]
   * arr2 = [9,8,7,6]
   * arr3 = [...arr1, ...arr2]
   * ? arr3 = [1,2,3,4,5,9,8,7,6]
   */

  let params = [];
  const t_seq = req.body.t_seq;
  const t_date = req.body.t_date;

  params = [...Object.values(req.body), ...Object.values(req.body)];
  console.log(t_seq);
  if (!t_date) {
    try {
      await mysqlconn.promise().execute(TD_Delete, [t_seq]);
    } catch (err) {
      if (err) {
        console.log(err);
        return res.end("Delete 오류 발생");
      }
    }
    res.redirect("/");
  } else {
    /**
     * MySQL의 TD_Insert_OR_Update을 사용하여
     * insert of update를 실행하려고 하면
     * parameter로 사용되는 배열을 두 번 나열해주어야한다.
     * mysql2 버그
     */

    try {
      await mysqlconn.promise().execute(TD_Insert_OR_Update, params);
    } catch (err) {
      if (err) {
        res.write(err);
        return res.end("Inser or Update SQL 문제 발생");
      }
      res.redirect("/");
    }
  }

  console.log("실행 완료");
});

export default router;
