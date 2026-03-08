import type { Filter } from "../hooks/useTodos";

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

function TodoFilter({ filter, setFilter, clearCompleted }: Props) {
  return (
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
  );
}

export default TodoFilter;