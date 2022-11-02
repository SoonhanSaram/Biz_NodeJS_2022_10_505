import express from "express";

calc.get("/calc/:num1/:num2", (req, res) => {
  let nums = { num1, num2 }.req.params;

  res.send(num1 + num2);
});

export default clac;
