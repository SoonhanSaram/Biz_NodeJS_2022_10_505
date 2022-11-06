import express from "express"
import path from "path"
import logger from "morgan"
import viewRouter from "../routes/interior.js"

// app을 express로 선언
const app = express()



// middle ware 선언
app.use(logger("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join("public")));
app.set("views", path.join("./views"))
app.set("view engine", "ejs")




app.use("/", viewRouter)

// www.js에서 app을 사용하기위해 export선언
export default app