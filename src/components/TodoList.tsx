import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult} from "@hello-pangea/dnd"
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

type Props = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  editTodo: (id: string, text: string) => void;
};

export default function TodoList({ todos, toggleTodo, deleteTodo, setTodos,editTodo }: Props) {

  // Called when drag ends
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Make a new array to preserve immutability
    const newTodos = Array.from(todos);
    const [moved] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, moved);

    setTodos(newTodos);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                             <TodoItem
  key={todo.id}
  todo={todo}
  deleteTodo={deleteTodo}
  toggleTodo={toggleTodo}
  editTodo={editTodo}
/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}