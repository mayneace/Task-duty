# TaskDuty

A simple personal task manager built with **React**, **TypeScript**, and **Tailwind CSS**. Add tasks with a title, description, due date, and category, then filter and track them from a single list.

---

## Features

- Create, edit, and delete tasks
- Each task has: title, description, due date, category (`Work`, `Personal`, `Urgent`), and a completion flag
- Form validation — all fields are required, and the due date can't be set in the past
- Filter the task list by category and by completion status
- Data persists locally in the browser (no backend)

---

## Tech Stack

- React (functional components + hooks)
- TypeScript
- Tailwind CSS
- React Router (`react-router-dom`)
- React Icons

---

## Project Structure

```
client/
├── src/
│   ├── assets/              # logo, images
│   ├── components/
│   │   ├── NavBar.tsx        # top navigation
│   │   ├── Task.tsx          # single task row (display)
│   │   └── TaskForm.tsx      # shared form used by New Task & Edit Task
│   ├── hook/
│   │   └── useFetch.ts       # task state + localStorage persistence (add/update/delete/toggle)
│   ├── pages/
│   │   ├── Cover.tsx         # landing page
│   │   ├── MyTask.tsx        # task list with filters
│   │   ├── NewTask.tsx       # create a task
│   │   └── Edit.tsx          # edit an existing task
│   ├── types/
│   │   └── task.ts           # Task type, categories, and category styles
│   ├── App.tsx                # routes
│   ├── main.tsx               # entry point
│   └── index.css / App.css    # global styles, Tailwind directives
├── tailwind.config.ts
└── index.html
```

---

## Routes

| Path            | Page      | Description                     |
| --------------- | --------- | ------------------------------- |
| `/`             | `Cover`   | Landing page                    |
| `/myTask`       | `MyTask`  | List of all tasks, with filters |
| `/newTask`      | `NewTask` | Form to create a new task       |
| `/editTask/:id` | `Edit`    | Form to edit an existing task   |

> ⚠️ Route names must match exactly across `App.tsx`, `NavBar.tsx`, `Cover.tsx`, `MyTask.tsx`, `Task.tsx`, and `TaskForm.tsx`. If a link says `/tasks` but the route is registered as `/myTask`, React Router will throw a **"No routes matched location"** warning and render a blank page.

---

## Setup Instructions

1. **Install dependencies**

   ```bash
   cd client
   npm create vite@latest
   ```

2. **Install React Router, icons and tailwindCss** (if not already present)

   ```bash
   cd client
   npm install tailwindcss @tailwindcss/vite
   npm install react-router-dom
   npm install react-icons
   ```

3. **Run the dev server**

   ```bash
   cd client
   npm run dev
   ```

   NB: you have to "cd client" always due to the server folder
   The app will be available at the local URL Vite prints in the terminal (typically `http://localhost:5173`).

No backend or environment variables are required — tasks are stored in the browser's `localStorage` under the key `taskduty.tasks`.

---

## Known Issues

- **No error boundary.** If a page throws a rendering error (e.g. a component receives the wrong props), React unmounts the entire app instead of showing a fallback UI, which can look like a completely blank page with no navbar. Wrapping `<Routes>` in an error boundary is recommended.

- **Route naming must stay in sync manually.** There's no single source of truth for route paths — they're hardcoded as strings in multiple files (`NavBar.tsx`, `Cover.tsx`, `MyTask.tsx`, `Task.tsx`, `TaskForm.tsx`, `Edit.tsx`, `App.tsx`). Renaming a route in one place without updating the others causes broken links and "No routes matched" errors.

- **`NavBar.tsx` uses exact path matching for `/editTask`.** Since the actual URL is `/editTask/:id` (e.g. `/editTask/t2`), an exact `===` check against `/editTask` will never match. Use `location.pathname.startsWith("/editTask")` instead.

- **Data is local to one browser.** Since there's no backend, tasks don't sync across devices or browsers — clearing site data/localStorage will remove all tasks.

- **No confirmation dialog on delete.** Clicking "Delete" removes a task immediately with no undo.

- **No pagination or sorting.** All tasks render in one list; this may not scale well with a very large number of tasks.

---

## Stuffs that can be improvised on

- Centralize route paths in a single constants file to avoid mismatches
- Add a confirmation step before deleting a task is very important
- Add sorting (by due date, category, or completion) in cases of lot of tasks
- Replace `localStorage` and configure with render and mongoDB
- Add stuffs such as:
  1.  error boundary around the app's routes
  2.  lazy and suspense
  3.  await and async in cases of retrieving data from the database
  4.  Toaster/ hot-toast to pop up when you submit,add or delete any data
