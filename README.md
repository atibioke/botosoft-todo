# Todo App

This is a simple Todo application built with React, TypeScript, and Vite. The project demonstrates common frontend patterns such as component structure, state management, drag-and-drop interactions, and responsive design.

Users can create tasks, mark them as completed, delete them, filter them, and reorder them using drag and drop.

---

## Features

* Add a new todo
* Mark a todo as completed or active
* Delete a todo with a confirmation modal
* Filter todos (All, Active, Completed)
* Clear all completed todos
* Reorder todos using drag and drop
* Responsive layout that works on mobile devices

---

## Tech Stack

* React
* TypeScript
* Vite
* @hello-pangea/dnd for drag and drop
* CSS for styling

---

## Project Structure

```id="bcb0nr"
src
 ├── components
 │    ├── ConfirmModal.tsx
 │    ├── TodoFilter.tsx
 │    ├── TodoInput.tsx
 │    ├── TodoItem.tsx
 │    └── TodoList.tsx
 │
 ├── hooks
 │    └── useTodos.ts
 │
 ├── pages
 │
 ├── types
 │    └── todo.ts
 │
 ├── utils
 │
 ├── styling
 │    ├── ConfirmModal.css
 │    ├── TodoInput.css
 │    └── TodoItem.css
 │
 ├── App.css
 ├── App.tsx
 ├── index.css
 └── main.tsx
```

### Folder Overview

* **components**
  Contains reusable UI components used across the application.

* **hooks**
  Custom React hooks. `useTodos.ts` manages the logic for creating, updating, deleting, and filtering todos.

* **pages**
  Intended for page-level components if the project grows into a multi-page application.

* **types**
  Contains TypeScript types and interfaces used throughout the project.

* **utils**
  Reserved for helper functions and reusable utilities.

* **styling**
  Contains CSS files used to style specific components.

---

## Installation

Clone the repository:

```id="3nmxja"
https://github.com/atibioke/botosoft-todo.git
```

Move into the project directory:

```id="yifdcq"
cd todo-app
```

Install dependencies:

```id="nq68h3"
npm install
```

---

## Running the Project

Start the development server:

```id="9uvf8d"
npm run dev
```

Then open the application in your browser:

```id="zef9b8"
http://localhost:5173
```

---

## How the Application Works

Todos are stored in React state. When a user adds, deletes, or updates a task, the state is updated immutably and React automatically updates the interface.

Drag and drop functionality is implemented using `@hello-pangea/dnd`. When a task is dragged to a new position, the order of the todos is updated in state.

Before deleting a task, the application shows a confirmation modal to help prevent accidental deletion.

---

## Possible Improvements

Some improvements that could be added in the future include:

* Persisting todos with localStorage
* Adding animations for interactions
* Improving accessibility for the modal
* Adding automated tests
* Adding a dark mode option

---

## License

This project is open source and available under the MIT License.
# botosoft-todo
