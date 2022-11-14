import express from "express";
import db from "../models/index.js";
const router = express.Router();
const Customer = db.models.tbl_customer;
/* GET home page. */
router.get("/", async (req, res, next) => {
 // const customers = await Customer.findAll();
 res.render("index");
});
router.get("/customermanagemnet", async (req, res, next) => {
 const customers = await Customer.findAll();
 res.render("management", { customers });
});
router.get("/view/:c_id/detail", async (req, res, next) => {
 const id = req.params.c_id;
 const customers = await Customer.findAll({ where: { c_id: id } });
 res.render("customer_detail", { customers:customers[0] });
});
router.get("/modify/:c_id", async (req, res) => {
<<<<<<< HEAD
  const id = req.params.c_id;
  const customers = await Customer.findAll({ where: { c_id: id } });
  console.log(customers);

  res.render("modifying", { customers: customers[0] });
=======
 const id = req.params.c_id;
 const customers = await Customer.findAll({ where: { c_id: id } });
 console.log(customers);
 
 res.render("modifying", { customers: customers[0] });
>>>>>>> 1a202757e43297a8b3d432a9b11f7d6684fb9b71
});
router.get("/add", async (req, res, next) => {
 res.render("add");
});
router.post("/modify/:c_id", async (req, res) => {
 const id = req.body.c_id;
 try {
 await Customer.create(req.body);
 console.log(Customer);
 } catch (err) {
 await Customer.update(req.body, { where: { c_id: id } });
 }
 res.redirect("/customermanagemnet")
})
router.post("/add", async (req, res) => {
 try {
 await Customer.create(req.body);
 console.log(Customer);
 } catch (err) {
 await Customer.update(req.body, { where: { c_id: req.body.c_id } });
 }
 res.redirect("/customermanagemnet");
  });
router.post("/view/:c_id/detail", async (req, res) => {
 const id = req.body.c_id
 await Customer.destroy({ where: { c_id: id } });
 res.redirect("/customermanagemnet");
  });
  export default router;

  
