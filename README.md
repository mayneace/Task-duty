# TaskDuty

A personal task manager built with the **MERN stack** (MongoDB, Express, React, Node) and written in **TypeScript**. You sign up, log in, and manage your own tasks: add, edit, search, filter, and tick them off. Every user only ever sees their own tasks.

Built by **MOSES iPEOLA ADEBAYO** (Full-Stack Developer)

---

## ✨Features

- Register and log in (registering logs you in straight away)
- Create, edit, and delete your own tasks
- Each task has a title, description, due date, category (`Work`, `Personal`, `Urgent`), and a completed flag
- Search tasks by title or description
- Filter the list by category and by completion status
- Form validation: every field is required and the due date can't be in the past
- Show/hide button on password fields
- Toast pop-ups when you log in, add, edit, or delete something
- Loading spinner while tasks are fetched
- Protected pages: logged-out visitors get sent to the login page
- Works on mobile, with a dropdown menu in the navbar

---

## Tech stack

**Client(Front-End):** React, TypeScript, Tailwind CSS, React Router, Axios, React Hot Toast

**Server(Back-End):** Node.js, Express, TypeScript, MongoDB with Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs` for password hashing

---

## Project structure

```
PersonalTaskManager/
├── client/          ← React + TypeScript frontend (Vite + Tailwind)
└── server/          ← Express + TypeScript backend (Node.js)
```

---

## 🚀 Getting started

You need:
**Node.js**
**MongoDB** (MongoDB Atlas)

### 1. Clone repo

```bash
git clone <repo-url>
cd PersonalTaskManager
```

### 2. Set up server

```bash
cd server
npm install
```

Create `.env` file

```bash
cp .env.example .env
```

Fill up `.env`:

```dotenv
PORT=5010
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
JWT_EXPIRES_IN=3d
```

Start Server:

```bash
npm run dev
```

if You are not seeing something like `MongoDB connected: ...` and `TaskDuty API listening on port 5010`.. then you missed a step.. restart or retrace your steps

### 3. Set up the client

Open a **second terminal**:

```bash
cd client
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Fill up `.env`:

```dotenv
VITE_API_URL=http://localhost:5010/api
```

The port has to match the one in your server `.env`. Then start it:

```bash
npm run dev
```

Client runs usually at: `http://localhost:5173`

> NB: Both parts need to be running at the same time, and you always need to `cd` into the right folder first (`client` or `server`) before running a command.

## Pages

| Page                                    | Needs login? |
| --------------------------------------- | ------------ |
| Cover (landing page)                    | ❌           |
| Log in                                  | ❌           |
| Sign up                                 | ❌           |
| Your task list, with search and filters | ✅           |
| Create a task                           | ✅           |
| Edit a task                             | ✅           |
| Not found page                          | ❌           |

---

### Validation rules

- `title`, `description`, `dueDate`, and `category` are required when creating a task
- `category` must be `Work`, `Personal`, or `Urgent`
- `dueDate` can't be in the past. Use the format `yyyy-mm-dd`
- Passwords must be at least 8 characters, and are hashed (never returned in responses)
- Emails must be unique or you get an error "message": "An account with this email already exists"

---

## Known issues

**Server**

- **No real logout on the server.** Tokens last for `JWT_EXPIRES_IN` (3 days by default) and the server can't cancel one early. Logging out just means the users throw the token away. If a token leaks, it works until it expires.
- **No rate limiting.** Nothing slows down someone hammering the login endpoint with password guesses.
- **No email verification or password reset.** You can sign up with any email, and there's no "forgot password".
- **No admin role.** The only rule is "you can touch what you own".

**Client**

- **No confirmation before deleting.** Clicking Delete removes the task straight away, with no undo.
- **No sorting or pagination.** Everything renders in one list, which won't scale to hundreds of tasks.

**Important stuffs we ran into**

- **NEW TypeScript 7 Rules `ts-node` and `ts-node-dev`.** TypeScript 7 removed the old compiler API they rely on, so they crash on startup. That's why the server's `dev` script uses `tsx watch` instead. `npm run build` (plain `tsc`) is fine.
- **NEW Mongoose 9 renamed `FilterQuery` to `QueryFilter`.** Older tutorials still use the old name. This project uses the new one.

---

## Ideas for next steps

- Confirmation step before deleting a task
- Sorting (by due date, category, completion) and pagination
- Rate limiting on the auth routes (`express-rate-limit`)
- Refresh tokens or a token blacklist for proper logout
- Email verification and password reset
- Put route paths in one constants file
- Error boundary around the routes
- Store the token in an httpOnly cookie
- Integration tests for the ownership rules (e.g. with `supertest`)
- Install-to-home-screen support (web manifest and icons)

---

Make sure both `.env` files are listed in `.gitignore` before you commit. They contain your database string and `JWT_SECRET`.
