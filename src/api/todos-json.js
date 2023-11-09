import { default as express, Router } from "express"
const router = Router()
router.use(express.json())

const todos = [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Build something fun!", completed: false },
]

router.get("/", (_req, res) => {
    res.json(todos)
})

router.post("/", (req, res) => {
    const todo = {
        id: todos[todos.length - 1].id + 1,
        text: req.body.newTodo,
        completed: false,
    }
    todos.push(todo)
    res.json(todo)
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const updatedTodo = todos.find((todo) => todo.id === id)
    updatedTodo.completed = !updatedTodo.completed
    res.json(updatedTodo)
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const deletedTodo = todos.find((todo) => todo.id === id)
    todos.splice(todos.indexOf(deletedTodo), 1)
    res.json(deletedTodo)
})

export default router
