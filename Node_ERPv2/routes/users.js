import express from "express";
import DB from "../models/index.js";
const Users = DB.models.tbl_users;
const router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  const error = req.query.error;
  res.render("users/login", { error });

  req.session.save(() => {
    res.render("users/login");
  });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //DB로부터 username 데이터 조회하기
  const user = await Users.findByPk(username);
  // user 정보가 조회되면
  if (user) {
    // select된 데이터의 비밀번호값과 input에서 전달된 비밀번호가 맞는지 검사

    if (user.Password !== password) {
      // 비밀번호가 틀리면 다시 로그인으로 되돌려보내기
      // 이 때 error 변수에 메시지 전달하기
      return res.redirect("/users/login?error=PASSWORD");
    }
  } else {
    // user정보가 조회되지 않으면
    // 다시 로그인으로 되돌려보내기
    // 이 떄 error 변수에 메시지 전달하기
    return res.redirect("/users/login?error=USERNAME");
  }
  // 여기에 코드가 도착하면 user정보가 있고, 비밀번호도 맞음
  req.session.user = user; //DB의 user정보를 세팅
  req.session.save(() => {
    res.redirect("/");
  });

  // if (username === "kyengmin" && password === "123456") {
  // req.session.user = {
  // username: username,
  // real_name: "홍길동",
  // nick_name: "의적",
  // user_role: 1,
  // };
  // req.session.save(() => {
  // res.redirect("/");
  // });
  // } else {
  // const loginFail = {
  // status: "USERNAME",
  // };
  // res.redirect("/users/login");
  // }
});

router.get("/logout", (req, res) => {
  delete req.session.user;
  req.session.save(() => {
    res.redirect("/");
  });
});
export default router;
