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
router.get("/country/:gt_gnp/:lt_gnp", (req, res) => {
  const gt_gnp = req.query.gt_gnp;
  let lt_gnp = req.query.lt_gnp;

    if (!gt_gnp) {
      const mysql1 = "SELECT * FROM country WHERE GNP >= ?"
      mysql.execute(mysql1, [gt_gnp], error, result, f)
    } else {
    const citySelectWhereGNP =
      "SELECT * FROM country WHERE GNP between  >=? and  <=?";

    mysql.execute(
      citySelectWhereGNP,
      [lt_gnp,gt_gnp],
      (error, result, fields) => {
        res.json(result);
      }
    );
  
}});

router.get("/:name", (req, res) => {
  const ct_name = req.params.name;
  const citySelectWhere = "SELECT * FROM city WHERE name = ?";
  mysql.execute(citySelectWhere, [ct_name], (error, result, fields) => {
    res.json(result);
  });
});
export default router;
