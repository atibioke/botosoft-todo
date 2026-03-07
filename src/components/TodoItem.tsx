import '../styles/TodoItem.css'

type Todo = {
    id: string
    text: string
    completed: boolean
}

type Props = {
    todo: Todo
    toggleTodo: (id: string) => void
    deleteTodo: (id: string) => void
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
    return (
        <div className='todoitem-container'>
            <div className='checkbox-container'>


                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
            </div>
            <div className='todo-text-container'>


                <span
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                    }}
                >
                    {todo.text}
                </span>
            </div>
            <div className='delete-button-container'>


                <button onClick={() => deleteTodo(todo.id)} className='delete-btn'>
                    Delete
                </button>
            </div>
        </div>
    )
}