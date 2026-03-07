import { useState } from "react";
import '../styles/TodoInput.css'

type Props = {
    addTodo: (text: string) => void;
};

export default function TodoInput({ addTodo }: Props) {
    const [text, setText] = useState("");

    ////// Explicit type for event
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text.trim());
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-input-container" >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo..."
                className="todo-input"

            />
            <button
                type="submit"
                className="submit-btn"
            >
                Add
            </button>
        </form>
    );
}