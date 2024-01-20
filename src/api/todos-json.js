import { Hono } from "hono"
const router = new Hono()

const todos = [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Build something fun!", completed: false },
]

router.get("/", (c) => c.json(todos))

router.post("/", async (c) => {
    const { newTodo } = await c.req.json()
    const createdTodo = {
        id: (todos.at(-1)?.id || 0) + 1,
        text: newTodo,
        completed: false,
    }
    todos.push(createdTodo)
    return c.json(createdTodo)
})

router.put("/:id", (c) => {
    const id = Number(c.req.param("id"))
    const updatedTodo = todos.find((todo) => todo.id === id)
    updatedTodo.completed = !updatedTodo.completed
    return c.json(updatedTodo)
})

router.delete("/:id", (c) => {
    const id = Number(c.req.param("id"))
    const deletedTodo = todos.find((todo) => todo.id === id)
    todos.splice(todos.indexOf(deletedTodo), 1)
    return c.json(deletedTodo)
})

export default router
