import { Hono } from "hono"
import { logger } from "hono/logger"

import index from "./pages/index.js"
import htmx from "./pages/htmx.js"
import react from "./pages/react.js"
import todosJson from "./api/todos-json.js"
import todosHx from "./api/todos-hx.js"

const app = new Hono()

app.use("*", logger())
app.get("/", (c) => c.html(index))
app.get("/htmx", (c) => c.html(htmx))
app.get("/react", (c) => c.html(react))

app.route("/api/todos-json/", todosJson)
app.route("/api/todos-hx/", todosHx)

export default app
