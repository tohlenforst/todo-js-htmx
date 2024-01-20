import { serve } from "@hono/node-server"
import app from "./app.js"

serve(app, ({ port }) => console.log(`Started server http://localhost:${port}`))
