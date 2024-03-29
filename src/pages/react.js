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
                src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"
                integrity="sha384-tMH8h3BGESGckSAVGZ82T9n90ztNXxvdwvdM6UoR56cYcf+0iGXBliJ29D+wZ/x8"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"
                integrity="sha384-bm7MnzvK++ykSwVJ2tynSE5TRdN+xL418osEVF2DE/L/gfWHj91J2Sphe582B1Bh"
                crossorigin="anonymous"
            ></script>
            <script
                src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"
                integrity="sha384-VgZgZqjY9Fh+YsIGYp/Vzpbz9fdsC3TLwB4MrpOstd9QcaJdH/8aYw5vwisv8i8d"
                crossorigin="anonymous"
            ></script>
        </head>
        <body>
            <a href="/">Back Home</a> > React
            <div id="root"></div>
            <script type="text/babel">
                const Todos = () => {
                    const [todos, setTodos] = React.useState([])
                    const [newTodo, setNewTodo] = React.useState("")

                    const getTodos = async () => {
                        const res = await fetch("/api/todos-json/")
                        const data = await res.json()
                        setTodos(data)
                    }

                    const addTodo = async () => {
                        const res = await fetch("/api/todos-json/", {
                            method: "POST",
                            body: JSON.stringify({ newTodo }),
                        })
                        const data = await res.json()
                        setTodos([...todos, data])
                        setNewTodo("")
                    }

                    const updateTodo = (id, completed) => async (e) => {
                        const res = await fetch("/api/todos-json/" + id, {
                            method: "PUT",
                            body: JSON.stringify({ completed }),
                        })
                        const data = await res.json()
                        setTodos(
                            todos.map((todo) => (todo.id === id ? data : todo)),
                        )
                    }

                    const deleteTodo = (id) => async (e) => {
                        const res = await fetch("/api/todos-json/" + id, {
                            method: "DELETE",
                        })
                        const data = await res.json()
                        setTodos(todos.filter((todo) => todo.id !== data.id))
                    }

                    React.useEffect(() => {
                        getTodos()
                    }, [])

                    return (
                        <div>
                            {todos.map(({ id, text, completed }) => (
                                <div style={{ border: "1px solid black" }}>
                                    <div>ID: {id}</div>
                                    <div>Text: {text}</div>
                                    <div>
                                        Completed?:{" "}
                                        {completed ? "true" : "false"}
                                    </div>
                                    <button
                                        onClick={updateTodo(id, !completed)}
                                    >
                                        Toggle Completed
                                    </button>
                                    <button onClick={deleteTodo(id)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                name="newTodo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button onClick={addTodo}>Add todo</button>
                        </div>
                    )
                }

                const container = document.querySelector("#root")
                const root = ReactDOM.createRoot(container)
                root.render(<Todos />)
            </script>
        </body>
    </html>
`
