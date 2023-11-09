import express from "express"
import morgan from "morgan"
import todosJson from "./api/todos-json.js"
import todosHx from "./api/todos-hx.js"

const app = express()
app.use(morgan("dev"))
app.use(express.static("src/public"))

app.use("/api/todos-json", todosJson)
app.use("/api/todos-hx", todosHx)

app.listen(3000, () => {
    console.log("TODOS RUNNING ON PORT 3000")
})
