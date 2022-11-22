import express from "express";
import DB from "../models/index.js";
const buyer = DB.models.tbl_buyer;
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    const buyers = await buyer.findAll();
    return res.render("buyerlist", { buyers });
  }
  res.redirect("/users/login?error=LOGIN");
});

router.get("/insert", (req, res) => {
  if (req.session.user && req.session.user.User_role < 5) {
    return res.render("write", { buyer: {} });
  }
  res.redirect("/users/login?error=ROLE");
});

router.post("/insert", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.User_role || user?.User_role >= 3) {
    return res.redirect("/users/login?error=ROLE");
  }
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
router.get("/detail/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  const user = req.session?.user;
  if (!user) {
    return res.redirect("/users/login?error=ROLE");
  }
  /**
   * find()는 결과가 1개더라도 결과값이 배열이다
   * findOne()은 1개의 결과만 찾고 만약 결과가 여러개더라도
   * 최초의 한개만 추출
   * 결과는 무조건 단일 객체
   */
  try {
    const buyers = await buyer.findOne({ where: { b_code: bcode } });
    res.render("detail", { buyers });
  } catch (err) {
    res.send("SQL 오류 데이터를 찾을 수 없습니다.");
  }
});

router.get("/update/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  const user = req.session?.user;
  if (!user || !user?.User_role || user?.User_role >= 3) {
    return res.redirect("/users/login?error=ROLE");
  }
  try {
    const buyers = await buyer.findOne({ where: { b_code: bcode } });
    res.render("write", { buyer: buyers });
  } catch (err) {
    res.send("SQL 오류 데이터를 찾을 수 없습니다.");
  }
});

router.post("/update/:bcode", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.User_role || user?.User_role >= 3) {
    return res.redirect("/users/login?error=ROLE");
  }
  try {
    await buyer.update(req.body, { where: { b_code: req.body.b_code } });
    res.redirect(`/buyer/detail/${req.body.b_code}`);
  } catch (err) {
    res.send("SQL 오류");
  }
});
router.get("/delete/:bcode", async (req, res) => {
  const user = req.session?.user;
  if (!user || !user?.User_role || user?.User_role >= 3) {
    return res.redirect("/users/login?error=ROLE");
  }
  try {
    await buyer.destroy({ where: { b_code: req.body.b_code } });
    res.redirect("/buyer");
  } catch (err) {
    res.send("SQL 오류");
  }
});
/**
 * web에서 거래처 코드 자동생성을 요청할 때
 * DB에서 b_code 가장 큰값 + 1을 연산하여
 * web Response하는 router
 *
 * 가장 큰 거래처 코드가 B0001< B0002 < B0111 이렇게 등록되어 있을 때
 * B0112 코드를 자동생성하여 response하기
 */
router.get("/get/bcode", async (req, res) => {
  /**
   * sequelize에선 기본적인 CRUD를 함수로 제공한다
   * 하지만 기본제공 기능이 아닌 특별한 SQL을 사용하는 방법
   * 이 떄 기본이 외의 별도 SQL을 작성하는 것을 raw SQL query라고 한다
   */
  const rawSQL = "select * from tbl_buyer order by b_code desc limit 1";
  try {
    const [buyers, f] = await DB.sequelize.query(rawSQL, { model: buyer });
    let bcode = "B0000"; //거래처코드 Domain

    // 거래처 table에서 조회한 데이터가 있으면 bcode에 b_code값을 담고
    // 없으면 B0000을 담기
    bcode = buyers?.b_code || bcode;

    const prefix = bcode.substring(0, 1); //substring = bcode를 0 , n 0 ~ n번째 까지 자르기
    const suffix = bcode.substring(1); // bcode 값을 1번째부터 나머지다 자르기
    const codeSeq = Number(suffix) + 1;

    bcode = `0000${codeSeq}`;
    bcode = bcode.substring(bcode.length - 4);
    bcode = prefix + bcode;
    res.send(bcode);
  } catch (err) {}
});

router.get("/check/:bcode", async (req, res) => {
  const bcode = req.params.bcode;
  try {
    const buyers = await buyer.findByPk(bcode);
    if (buyers) {
      return res.json({ status: "yes", message: "등록된 거래처코드" });
    } else {
      return res.json({ status: null, message: "사용가능한 거래처코드" });
    }
  } catch (err) {
    res.send("SQL 오류");
  }
});
export default router;
