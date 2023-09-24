import express from "express";
import router from "./routes/index.routes.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)


app.listen(4000)
console.log(`http://localhost:4000`)