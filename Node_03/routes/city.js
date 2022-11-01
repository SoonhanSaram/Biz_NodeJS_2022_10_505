/**
 * express import 하고
 * express.Router() 함수를 사용하여 router 객체 선언
 * router 객체를 export 하여 모듈 선언 완성
 */

import express from "express";
import mysql from "../modules/mysqlDB.js";
const router = express.Router();

//http://localhost:3000/city/의 요청처리
router.get("/", (req, res) => {
  //   res.send("안녕하세요 도시 정보 입니다.");
  const citySelect = "SELECT * FROM city Limit 0, 10";

  /**
   * mysql 객체(퀵)를 통하여 MySQL Server에게
   * SQL(SELECT)를 보내고, 결과가 되돌아오는 동안
   * 다른 일(코드, 기능)을 수행하라
   * 만약 MySQL Sever에서 데이터가 완료되어 되돌아거든
   * (error,result,field)=>{} 이 함수를 실행
   * 이 함수를 비동기(Async) CallBack 함수라고 한다
   */
  mysql.query(citySelect, (error, result, feild) => {
    res.json(result);
  });
});
/**
 * localhost:3000/city/pop/10000/50000 이라고 요청을 하면
 * 인구 1만이상 5만 이하의 도시를 웹으로 Response하시오
 */
/// http://localhost:3000/city/pop/gt_pop=10000/lt_pop=50000
// queryString :주소표시줄에 ?변수명=값 형식으로 데이터 전달
//              주소표시줄에 변수명이 노출되므로 보안에 취약
router.get("/pop", (req, res) => {
  const gt_pop = req.params.gt_pop;
  const lt_pop = req.params.lt_pop;

  const citySelectWherePopul =
    "SELECT * FROM city WHERE population between  ? and  ?";
  mysql.execute(
    citySelectWherePopul,
    [lt_pop, gt_pop],
    (error, result, fiedls) => {
      res.json(result);
    }
  );
});
/**
 * RequestParam 방식으로 데이터 전달하기
 * 이미 변수가 정해진 것처럼 데이터를 전달
 * 순서와 갯수가 일치하지 않아도 됨
 * 최근 많이쓰는 방식
 */
router.get("/pop/:lt_pop/:gt_pop", (req, res) => {
  const gt_pop = req.params.gt_pop;
  const lt_pop = req.params.lt_pop;

  const citySelectWherePopul =
    "SELECT * FROM city WHERE population between  ? and  ?";
  mysql.execute(
    citySelectWherePopul,
    [lt_pop, gt_pop],
    (error, result, fiedls) => {
      res.json(result);
    }
  );
});

// localhost:3000/city/도시이름이라고 요청을 하면

//http://localhost:3000/city/country의 요청처리
router.get("/country", (req, res) => {
  // res.send("나는 국가 정보 입니다.");
  const countrySelect = "SELECT * FROM country ";
  mysql.query(countrySelect, (error, data, fields) => {
    res.json(data);
  });
  mysql.query(countrySelect);
});

/**
 * http://localhost:3000/country/100/500
 * 각 국가의 GNP가 100이상 500이하인 국가 리스트 SELECT
 *
 * http://localhost:3000/country/500
 * 각 국가의 GNP가 0이상 100이하인 국가 리스트 SELECT
 */
//http://localhost:3000/country/100/200 에 대한 응답
//http://localhost:3000/country/100 처럼 요청을 하면 없는 url라고 거부 (Not found)
//두 가지 Request를 처리하기 위하여
//ResquestMapping("/country/....")을 배열로 선언하여
//두 가지 Request를 일단 모두 받도록 처리한다.
// Multi Request Mapping

router.get(["/country/:lt_gnp/:gt_gnp", "/country/:gt_gnp"], (req, res) => {
  // 변수가 2개일 때, 변수가 1개일 때 어떻게 처리할 것인가.
  // const gt_gnp = req.params.gt_gnp;
  // let lt_gnp = req.params.lt_gnp;

  // 객체의구조분해
  // req.params에 있는 sub속성들 중에서
  // lt_gnp, gt_gnp를 추출하여 같은 이름의 변수를 생성하고
  // 그 변수에 값을 저장해 달라
  let { lt_gnp, gt_gnp } = req.params;
  console.log(lt_gnp, gt_gnp);
  /**
   * 현재 여기의 요청 처리는 lt_gnp변수와 gt_gnp변수를 전달받아
   * 처리 한다
   * country/100/500 처럼 2개의 변수를 모두 전달하면
   * lt_gnp = 100 , gt_gnp 500의 값이 변수에 담기게 된다
   *
   * 만약
   * country/100처럼 1개의 변수만 전달하면
   * lt_gnp = undefined, end =100의 값이 변수에 담기게 된다.
   * 만약 lt_gnp가 undefined면 lt_gnp = 0으로 세팅하면 된다
   */
  // if (!lt_gnp) {
  //   lt_gnp = 0;
  // }

  // x = a || B|| c|| "없음"
  // !a 이면 b
  // !a, !b이면 c
  // !a, !b, !c이면 "없음"이 x의 값
  lt_gnp = lt_gnp || 0;
  console.log(lt_gnp, gt_gnp);
  const sql = "SELECT * from country where gnp between ? and ?";
  mysql.execute(sql, [lt_gnp, gt_gnp], (err, result, f) => {
    res.json(result);
  });
});
// 선택적 파라메터 Request Mapping
router.get("/gnp/:start?/:end?", (req, res) => {
  let { start, end } = req.params;
  console.log(start, end);

  // city/gnp/100 처럼 1개의 데이터만 전송을 하면
  // start = 100, end = undefines가 담기게 된다
  // 일단 end 값이 undefined이면 0으로 세팅하게 된다
  end = end || 0;
  // city/gnp/100 처럼 1개의 데이터만 전송을 했다면
  // tsart = 100, end = 0으로 세팅이 된다
  console.log(start, end);

  //start와 end가 서로 바뀐상태
  //start와 end를 서로 교환하기
  if (end === 0) {
    // const _t = start;
    // start = end;
    // end = _t;

    // ^ : Exclusive or
    // x = x + y
    // y = (x+y) - y
    // x = (x+y-y) - y
    // 변수 swap을 하기 위한 코드
    start = start ^ end;
    end = start ^ end;
    start = start ^ end;
  }
  const sql = "SELECT * FROM country WHERE gnp between ? and ?";
  mysql.execute(sql, [start, end], (err, result, f) => {
    res.json(result);
  });
});

router.get("/:name", (req, res) => {
  const ct_name = req.params.name;
  const citySelectWhere = "SELECT * FROM city WHERE name = ?";
  mysql.execute(citySelectWhere, [ct_name], (error, result, fields) => {
    res.json(result);
  });
});
export default router;
