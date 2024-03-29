/*  open api 에서 가져온 데이터를 tbl_holiday 테이블로 업데이트 */

import request from "request";
/* npm install --save request */
import scheduler from "node-schedule";
/* npm install --save node-schedule */

import express from "express";

const router = express.Router();

const url =
  "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
const servicekey =
  "9sO%2BZVBC9mjTRJen1l4kyCib4qEKBjsmKRIWkI2U%2FCdv16CRM60dzGlagqOTQIwK0W1kpY4tG4Silvvhlf7H%2Fg%3D%3D";

// 내년 국경일(공휴일 + 제헌절) 정보 업데이트
let currentYear = new Date().getFullYear() + 1;
// 2021
// new Date().getFullYear();

let queryParams = `?${encodeURIComponent("serviceKey")}=${servicekey}`;
queryParams += `&${encodeURIComponent("solYear")}=${encodeURIComponent(
  currentYear
)}`;
//queryParams +=
//  `&${encodeURIComponent("solMonth")}=${encodeURIComponent("12")}`;
queryParams += `&${encodeURIComponent("numOfRows")}=${encodeURIComponent(
  "100"
)}`;
queryParams += `&${encodeURIComponent("_type")}=${encodeURIComponent("json")}`;

const option = {
  url: url + queryParams,
  method: "GET",
};

// cron 표현식, 초 분 시 일 월 년
// 매일 자정마다 scheduler 실행, 기본키 중복된 경우 update
// "*/5 * * * * *"
const saveHoli = scheduler.scheduleJob("0 0 0 * * *", () => {
  request(option, async (error, response, body) => {
    // console.log("Status", response.statusCode);
    // console.log("Headers", JSON.stringify(response.headers));
    // console.log("Reponse received", body);
    let holiData = {};

    let data = await JSON.parse(body)["response"]["body"]["items"]["item"];
    // 여러 객체 리터럴이 배열 안에 묶여있는 형식
    for (let i of data) {
      // cf) 선생님 comment
      // 구조분해 하면서 변수 이름 변경
      // 왼쪽(실제변수) : 오른쪽(바꿀이름)
      let {
        dateName: h_dateName,
        isHoliday: h_isHoliday,
        locdate: h_locdate,
        seq: h_seq,
      } = i;
      if (h_dateName === "1월1일") h_dateName = "신정";
      if (h_dateName === "기독탄신일") h_dateName = "성탄절";
      holiData = { h_dateName, h_isHoliday, h_locdate, h_seq };
      console.log(holiData);
      try {
        await Holiday.create(holiData);
      } catch (error) {
        Holiday.update(holiData, { where: { h_locdate: holiData.h_locdate } });
      }
    }
  });
});

export default router;
