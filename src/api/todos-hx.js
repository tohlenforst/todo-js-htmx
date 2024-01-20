import { Hono } from "hono"
import { html } from "hono/html"
const router = new Hono()

const todos = [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Build something fun!", completed: false },
]

const todo = ({ id, text, completed }) => html`
    <div
        style="border: 1px solid black;"
        hx-target="closest div"
        hx-swap="outerHTML"
    >
        <div>ID: ${id}</div>
        <div>Text: ${text}</div>
        <div>Completed?: ${completed.toString()}</div>
        <button hx-put="/api/todos-hx/${id}">Toggle Completed</button>
        <button hx-delete="/api/todos-hx/${id}" hx-swap="delete">Delete</button>
    </div>
`

router.get("/", (c) => c.html(html`<div>${todos.map(todo)}</div>`))

router.post("/", async (c) => {
    const { newTodo } = await c.req.parseBody()
    const createdTodo = {
        id: (todos.at(-1)?.id || 0) + 1,
        text: newTodo,
        completed: false,
    }
    todos.push(createdTodo)
    return c.html(todo(createdTodo))
})

router.put("/:id", (c) => {
    const id = Number(c.req.param("id"))
    const updatedTodo = todos.find((todo) => todo.id === id)
    updatedTodo.completed = !updatedTodo.completed
    return c.html(todo(updatedTodo))
})

router.delete("/:id", (c) => {
    const id = Number(c.req.param("id"))
    const deletedTodo = todos.find((todo) => todo.id === id)
    todos.splice(todos.indexOf(deletedTodo), 1)
    return c.html(deletedTodo)
})

export default router
