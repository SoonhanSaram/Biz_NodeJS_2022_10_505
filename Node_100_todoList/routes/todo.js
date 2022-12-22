import express from "express";
import db from "../models/index.js";

const todoDB = db.models.tbl_todolist;
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // const result = await todoDB.findAll();
    // return res.json(result);
    return next();
  } catch (err) {
    console.log(err);
    return res.json({ err: "select 오류" });
  }
});

router.get("/insert", (req, res) => {
  return res.render("write");
});

router.post("/insert", async (req, res, next) => {
  const todo = req.body;

  try {
    await todoDB.create(todo);
    return next();
  } catch (err) {
    console.error(err);
  }
});

router.put("/update", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    await todoDB.update(data, { where: { id: data.id } });
    return next();
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;

  console.log(id);
  try {
    await todoDB.destroy({ where: { id } });
    return next();
  } catch (err) {
    return res.json({ error: "삭제 오류" });
  }
});
router.put("/complete/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const todo = await todoDB.findByPk(id);
    console.log(todo);
    await todoDB.update(
      { ...todo, e_date: todo.e_date ? "" : "000" },
      { where: { id } }
    );

    return next();
  } catch (error) {
    return res.json({ error: "업데이트 오류" });
  }
});

/**
 * 각 router next() 함수가 실행되면
 * 요청을 또 한번 처리할 router
 * url "/**" ANT pattern
 */
router.all("/**", async (req, res) => {
  try {
    const result = await todoDB.findAll();
    return res.json(result);
  } catch (error) {
    return res.json({ error: "SELET 오류" });
  }
});

/**
 * get /todo/*** 요청이 들어왔을 때
 * 위의 router들이 처리할 수 있는 URL에 필터링이 되지 않으면
 * 다음의 router가 요청을 수신, 처리
 */
router.get("/:id", async (req, res) => {
  return res.send("404 NOT Found");
});

export default router;
