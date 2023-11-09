import { default as express, Router } from "express"
const router = Router()
router.use(express.urlencoded({ extended: true }))

const todos = [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Build something fun!", completed: false },
]

const todo = ({ id, text, completed }) => `
    <div style="border: 1px solid black;" hx-target="closest div" hx-swap="outerHTML">
        <div>ID: ${id}</div>
        <div>Text: ${text}</div>
        <div>Completed?: ${completed.toString()}</div>
        <button hx-put="/api/todos-hx/${id}">Toggle Completed</button>
        <button hx-delete="/api/todos-hx/${id}">Delete</button>
    </div>
`

router.get("/", (_req, res) => {
    res.send(`<div>${todos.map(todo).join("")}</div>`)
})

router.post("/", (req, res) => {
    const newTodo = {
        id: todos[todos.length - 1].id + 1,
        text: req.body.newTodo,
        completed: false,
    }
    todos.push(newTodo)
    res.send(todo(newTodo))
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const updatedTodo = todos.find((todo) => todo.id === id)
    updatedTodo.completed = !updatedTodo.completed
    res.send(todo(updatedTodo))
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const deletedTodo = todos.find((todo) => todo.id === id)
    todos.splice(todos.indexOf(deletedTodo), 1)
    res.send("")
})

export default router
