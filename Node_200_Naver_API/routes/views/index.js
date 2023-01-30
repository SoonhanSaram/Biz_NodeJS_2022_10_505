import express from "express";
import Naver from "../../config/naver_config.js";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.redirect("/book");
});

export default router;
