import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import "./App.css";
import ConfirmModal from "./components/ConfirmModal";
import { getEmptyMessage } from "./utils/getEmptyMessage";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    filteredTodos,
    editTodo,
  } = useTodos();

  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  ////// Ask delete
  const askDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setShowModal(true);
  };

  ////// Confirm delete
  const confirmDelete = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete);
    }

    setShowModal(false);
    setTodoToDelete(null);
  };

  ////// Drag & Drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTodos = Array.from(todos);
    const [moved] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, moved);
  };

  return (
    <div className="main-container">
      <div className="container">
        <h1 className="todo-header">Todo App</h1>

        {/* Filters */}
        <div className="filter-buttons-container">
          <div className="buttons-container">
            <button
              className="filter-btn"
              disabled={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className="filter-btn"
              disabled={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active
            </button>

            <button
              className="filter-btn"
              disabled={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button className="filter-btn" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>

        <TodoInput addTodo={addTodo} />

        {/* Drag & Drop List */}
        <div className="dragdrop-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodos.length === 0 ? (
                    <div className="no-todo-container">
                      <p className="no-todo-text">
                        {getEmptyMessage(filter)}
                      </p>
                    </div>
                  ) : (
                    filteredTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                            className="todos-container"
                          >
                            <TodoItem
                              key={todo.id}
                              todo={todo}
                              toggleTodo={toggleTodo}
                              deleteTodo={askDeleteTodo}
                              editTodo={editTodo}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default App;