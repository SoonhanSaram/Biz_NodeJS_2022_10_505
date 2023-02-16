import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/rooms", async (req, res, next) => {
  res.render("waiting_room");
});

router.get("/chat/:id", async (req, res) => {
  console.log("object");
  const id = req.params.id;
  res.render("detail");
});

export default router;
