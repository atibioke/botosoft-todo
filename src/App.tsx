import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd"
import './App.css'
import ConfirmModal from "./components/ConfirmModal";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null)

  ////// Add a new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  ////// Toggle complete
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  ////// Ask delete a todo
  const askDeleteTodo = (id: string) => {
    setTodoToDelete(id)
    setShowModal(true)
  }


  // const deleteTodo = (id: string) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };
  //////Confirm delete
  const confirmDelete = () => {
    if (todoToDelete) {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete))
    }

    setShowModal(false)
    setTodoToDelete(null)
  }

  ////// Clear all completed
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  ////// Handle drag & drop reorder
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTodos = Array.from(todos);
    const [moved] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, moved);

    setTodos(newTodos);
  };

  ////// Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });


  

  return (
    <div className="main-container">
      <div className="container">
        <h1 className="todo-header">Todo App</h1>


        {/* Filters */}
        <div className="filter-buttons-container" >
          <div className="buttons-container">


            <button className="filter-btn" disabled={filter === "all"} onClick={() => setFilter("all")}>
              All
            </button>
            <button className="filter-btn" disabled={filter === "active"} onClick={() => setFilter("active")} >
              Active
            </button>
            <button className="filter-btn" disabled={filter === "completed"} onClick={() => setFilter("completed")}>
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
                  {filteredTodos.length === 0 ? (<div className="no-todo-container">
                  <p className="no-todo-text">No todos yet! Add one above.</p></div>) :  filteredTodos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
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
                          />
                        </div>
                      )}
                    </Draggable>
                  ))  }
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
  );
}

export default App;