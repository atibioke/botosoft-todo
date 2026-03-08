import { useState } from "react";
import type { Todo } from "../types/todo";
import type { DropResult } from "@hello-pangea/dnd";

export type Filter = "all" | "active" | "completed";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
/////Add todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString() ,
      text ,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };
//////Toggle check
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed } : todo
      )
    );
  };
/////Delete todo
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
//////Edit todo
  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };
////Clear completed todos
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  ////// FIXED DRAG LOGIC
const reorderTodos = (result: DropResult) => {
  const { source, destination } = result;

  if (!destination) return;

  setTodos((prev) => {
    const newTodos = Array.from(prev);
    const [moved] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, moved);
    return newTodos;
  });
};

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    filter,
    setFilter,
    filteredTodos,
    reorderTodos,
  };
}