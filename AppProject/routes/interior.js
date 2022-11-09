import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index")
})



router.get("/reg", (req, res) => {
    res.render("index", {body: "reg"})
})

router.get("/alarm", (req, res) => {
    res.render("index", {body: "alarm"})
})

router.get("/event", (req, res) => {
    res.render("index", {body: "event"})
})

router.get("/login", (req, res) => {
    res.render("index", {body: "login"})
})


export default router