import { Hono } from "hono"
import { logger } from "hono/logger"
import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"

import todosJson from "./api/todos-json.js"
import todosHx from "./api/todos-hx.js"

const app = new Hono()
app.use("*", logger())
app.get("/*", serveStatic({ root: "./src/public/" }))

app.route("/api/todos-json/", todosJson)
app.route("/api/todos-hx/", todosHx)

serve(app, ({ port }) => console.log(`Listening on http://localhost:${port}`))
