import express from "express";
import DB from "../models/index.js";
const buyer = DB.models.tbl_buyer;
const router = express.Router();

router.get("/", async (req, res) => {
  const buyers = await buyer.findAll();

  res.render("buyerlist", { buyers });
});

router.get("/insert", (req, res) => {
  res.render("write");
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await buyer.create(data);
    res.redirect("/buyer");
  } catch (err) {
    console.log(err);
    res.send(`SQL 오류`);
  }
});
router.get("/detail", (req, res) => {
  res.render("detail");
});

export default router;
