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
            <script
                src="https://unpkg.com/htmx.org@1.9.10"
                integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
                crossorigin="anonymous"
            ></script>
        </head>
        <body>
            <a href="/">Back Home</a> > HTMX
            <div id="todos" hx-get="/api/todos-hx/" hx-trigger="load"></div>
            <form
                hx-post="/api/todos-hx/"
                hx-target="#todos"
                hx-swap="beforeend"
            >
                <input type="text" name="newTodo" />
                <button>Add todo</button>
            </form>
        </body>
    </html>
`
