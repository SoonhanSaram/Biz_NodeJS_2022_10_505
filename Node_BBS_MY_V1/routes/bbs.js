import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";

// DB CRUD 핸들을 수행할 Model 객체
const BBS = DB.models.tbl_bbs;
const FILES = DB.models.tbl_files;
const router = express.Router();
/**
 * router의 response 원칙
 * 한 개의 router에서는 반드시 한번의 response를 한다
 *
 * router에서 if 조건문을 사용하거나, try처리를 하는 과정에서
 * res.send(), res.write(), res.end(), res.redirect(), res.render()
 * 이러한 코드가 중복되서 발견될 경우 nodejs express에선 경고성 오류를 발생
 * 경고성 오류는 무시되기도 하지만, 간혹 프로젝트를 멈추는 경우가 존재
 * 중복된 response코드가 있을 경우
 * 예기치 못하게 중복된 response 코드가 모두 실행되는 경우가 있기 때문
 * express의 router에서 res...관련된 코드가 실행되면
 * router가 끝나는 것이 원칙
 * 그렇지 않은 경우가 발생, 경고성 오류가 표시
 *
 * 이러한 경우를 방지하기위해
 * express에선 res... 코드를 반드시 return문과 함께 사용하도록 한다
 */
router.get("/", async (req, res) => {
  try {
    const result = await BBS.findAll();
    return res.render("bbs/list", { bbsList: result });
  } catch (err) {
    console.error(err);
    res.send("file SQL Error");
  }
  res.render("bbs/list");
});

router.get("/insert", (req, res) => {
  res.render("bbs/write");
});
/**
 * fileUp Middle ware 사용하여 파일 받기
 * 한 개 single("tag.name")
 * 이 땐, req.file 속성에 파일에대한 정보가 담김
 *
 * 여러개 array("태그 name")
 * 여러개의 파일을 첨부해 받을 때
 * 이 땐, req.files 속성에 파일에 대한 정보를 배열 담김
 *
 * fields({name:"tag1", name:"tag2"})
 * input type = "file" 속성을 갖는 tag들이 form에 여러개 있을 때
 * 한 번에 받기
 * 이 땐, req.files 속성에 파일 정보가 배열로 담김
 */
router.post("/insert", fileUp.array("b_upfile"), async (req, res) => {
  // fileUp Middle ware가 정상적으로 파일을 업로드하고 나면
  // req에 file이라는 속성을 생성하고
  // 업로드한 파일정보를 담아준다
  // router 코드에서 file정보를 사용할 수 있다.

  const file = req.file; // single로 받을 때만 사용 array로 받으면 undefined
  const files = req.files; // array로 받을 때만 사용
  const bbs = req.body;
  console.log("파일들", files, "파일", file);

  const uploadFile = (bbs, file) => {
    const upLoadFileInfo = {
      f_bseq: bbs.b_seq,
      f_original_name: file.originalname,
      f_save_name: file.filename,
      f_ext: "image",
    };
    return upLoadFileInfo;
  };
  try {
    // 게시글 저장
    /**
     * 여기에 코드가 도달하면 req.file로부터
     * 업로드된 파일 정보가 file 변수에 저장된 상태
     *
     * 1. 게시글을 insert
     * 2. insert된 게시글의 seq(b_seq)를 추출하여
     * 3. tbl_files 테이블에 insert할 때 사용
     */
    const bbsResult = await BBS.create(bbs);
    const filesInfo = files.map((file) => {
      return uploadFile(bbsResult, file);
    });
    // 다수의 데이터를 insert하기
    const fileResult = await FILES.bulkCreate(filesInfo);
    // res.render("bbs/detail", { bbsResult, fileResult, upLoadFileInfo });
    return res.redirect(`/bbs/detail/${bbsResult.b_seq}`);
  } catch (err) {
    console.error(err);
    res.send("SQL Eror");
  }
  res.json(file);
});

router.get("/detail/:seq", async (req, res) => {
  const seq = req.params.seq;
  try {
    const bbsresult = await BBS.findByPk(seq);
    const fileResult = await FILES.findAll({ where: { f_bseq: seq } });
    return res.render("bbs/detail", { bbs: bbsresult, files: fileResult });
  } catch (err) {
    console.error(err);
    return res.send("SQL Eror");
  }
});
/**
 * 파일이 첨부된 게시글 삭제하기
 * 1. 첨부파일 정보를 SELECT하고
 *    SELECT된 정보에서 파일이름을 추출해
 *    업로드된 파일을 먼저 삭제
 * 2. 첨부파일 정보를 삭제
 * 3. 게시글 삭제
 */
router.get("/delete/:seq", async (req, res) => {
  const seq = req.params.seq;
  const upLoadDir = path.join("public/uploads");
  let files;
  try {
    files = await FILES.findAll({ where: { f_bseq: seq } });
  } catch (err) {
    console.log(err);
    return res.send("FileList SELECT Error");
  }

  await files.forEach(async (file) => {
    try {
      const delFile = path.join(upLoadDir, file.f_save_name);
      //  file의 현재 상태인가를 검사하는 함수
      //  만약 delFile이 없으면 Exception이 발생
      fs.statSync(delFile);
      fs.unlinkSync(delFile);
    } catch (err) {
      console.log(file.f_save_name, "없음");
    }
  });

  try {
    await BBS.destroy({ where: { b_seq: seq } });
    return res.redirect("/bbs");
  } catch (err) {
    console.error(err);
    return res.send("BBS Delete Error");
  }

  /*
  try {
    // 삭제하려는 게시글의 첨부파일 리스트 SELECT
    const files = await FILES.findAll({ where: { f_bseq: seq } });
    const upLoadDir = path.join("public/uploads");
    // 첨부파일 리스트정보에 해당하는 실제 파일을 삭제
    await files.forEach(async (file) => {
      const delFile = path.join(upLoadDir, file.f_save_name);
      // 실제 파일이 있는 확인 후 삭제하기
      fs.stat(delFile),
        (err, state) => {
          // 실제 파일 삭제하기
          if (err.code !== "ENOENT") fs.unlinkSync(delFile);
        };
    });
    await BBS.destroy({ where: { b_seq: seq } });
    return res.redirect("/bbs");
    
  } */
});
export default router;
