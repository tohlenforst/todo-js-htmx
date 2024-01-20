import { html } from "hono/html"

export default html`
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>To-Do</title>
        </head>
        <body>
            <a href="/react">React</a>
            <a href="/htmx">HTMX</a>
        </body>
    </html>
`
