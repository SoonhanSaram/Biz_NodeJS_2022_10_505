import express from "express";
import DB from "../models/index.js";

const Product = DB.models.tbl_product;
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    const products = await Product.findAll();
    return res.render("./product/list", { products: {} });
  }
  res.redirect("/users/login?error=LOGIN");
});

router.get("/detail/:p_code", async (req, res) => {
  const pcode = req.params.p_code;
  if (req.session.user) {
    const products = await Product.findOne({ where: { p_code: pcode } });
    return res.render("./product/detail", { products });
  }
  res.redirect("/users/login?error=LOGIN");
});
router.get("/add", (req, res) => {
  if (req.session.user && req.session.user.User_role < 3) {
    return res.render("./product/add", { products: {} });
  }

  res.redirect("/users/login?error=LOGIN");
});

router.post("/add", async (req, res) => {
  if (!req.session.user || req.session.user.User_role < 3) {
    return res.redirect("/users/login?error=LOGIN");
  }
  const data = req.body;
  try {
    await Product.create(data);
    res.redirect("/product");
  } catch (err) {
    res.send("SQL 오류");
  }
});
export default router;
