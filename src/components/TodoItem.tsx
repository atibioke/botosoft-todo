import { useState } from "react";
import type { Todo } from "../types/todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/TodoItem.css'

type Props = {
    todo: Todo;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
};

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleSave = () => {
        if (!newText.trim()) return;
        editTodo(todo.id, newText);
        setIsEditing(false);
    };

    return (
        <div className="todoitem-container">
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                />
            </div>

            <div className="todo-text-container">
                {isEditing ? (
                    <>
                        <input
                            autoFocus
                            value={newText}
                            className="todo-input-edit"
                            onChange={(e) => setNewText(e.target.value)}
                        />


                    </>
                ) : (
                    <span
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none"
                        }}
                    >
                        {todo.text}
                    </span>
                )}
            </div>

            <div className="delete-button-container">

                {isEditing ? <button onClick={handleSave} className="icon-btn">
                    <FontAwesomeIcon icon={faCheck} style={{ color: "#2563eb" }} />
                </button> : <button onClick={() => setIsEditing(true)} className="icon-btn">
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "rgb(28, 26, 26)" }} />
                </button>}


                <button onClick={() => deleteTodo(todo.id)} className="icon-btn">
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dc2626" }} />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;