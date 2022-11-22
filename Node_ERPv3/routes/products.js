import express from "express";
import upload from "../modules/file_upload.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("products/list");
});

Router.get("/insert", (req, res) => {
  res.render("products/write");
});
/**
 * router에 middleware 끼워넣기
 * router의 함수 "(req, res) => {}" 는 text 데이터를 수신하는 용도
 * form에서 multipart/form-data로 이미지가 포함된 데이터가
 *  전송됨
 * 이 데이터를 중간에 upload.single() 함수에게 전달하여 이미지 관련
 *  처리를 먼저 수행하도록 하는 것
 */
Router.post("/insert", upload.single("p_image_file"), (req, res) => {
  console.log(req.body);
  const fileName = req?.file?.filename;
  req.body.p_vat = req.body?.p_vat || 0;
  const body = req.body;
  res.json({
    fileName,
    body,
  });
  // res.render("products/detail", { fileName });
});
export default Router;
