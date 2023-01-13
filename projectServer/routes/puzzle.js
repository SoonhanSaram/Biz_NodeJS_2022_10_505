import express from "express";
import db from "../models/index.js";
const router = express.Router();
const puzzleDB = db.models.tbl_puzzle;

router.get("/", async (req, res) => {
  return res.write("접속");
});

router.post("/:id", async (req, res) => {
  const playData = req.body;
  console.log(playData);
  try {
    await puzzleDB.create(playData);
    const result = await puzzleDB.findAll();
    console.log(result);
    // return res.json(result);
  } catch (error) {
    return res.write("서버오류");
  }
});

export default router;
