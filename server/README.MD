# TaskDuty API (Server) 
<!-- {Not Integrated with Client-Side Yet} -->

MERN STACK backend for TaskDuty, written in **TypeScript**. Handles user registration/login with JWT, and scopes all task CRUD so each user only ever sees or modifies their own tasks. No frontend wiring lives here for now — this is built to be tested directly with Postman API testing tool by MOSES ADEBAYO(Full-Stack developer)

---

## Tech Stack

- React Framework
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for authentication
- `bcryptjs` for password hashing

---

## How the authentication & authorization works

- **Authentication** — `POST /api/auth/register` and `POST /api/auth/login` both return a JWT (registering logs you in immediately; there's no separate "confirm your account" step). Every other route requires that token in the `Authorization: Bearer <token>` header.
- **Authorization is stateless.** The server never stores "who's logged in" anywhere — there's no session table, no server-side memory of active users. Every request is judged independently: _is there a valid, unexpired token on this request right now?_ "Staying logged in" just means whoever's calling the API keeps attaching the same token to every request (in Postman, that's the `{{token}}` environment variable set by the login/register request's test script).
- **Ownership (which tasks you can touch)** — every `Task` document has a `user` field. The task controller never looks up a task by id alone — it always queries `{ _id, user: req.user._id }` together. Asking for a task you don't own returns `404 Not Found`, so the API doesn't even confirm that task exists for someone else.
- **`req.user`** is attached by the `protect` middleware (`src/middleware/auth.ts`) after verifying the JWT. It's typed via a custom `AuthRequest` interface that extends Express's `Request` with an optional `user?: IUser` field (see Known Issues below on this approach).

---

## Setup

### Clone the repo

````bash
git clone <repo-url>
cd PersonalTaskManager
```

1. **Install dependencies**

```bash
   cd server
   npm install
````

2. **Create your `.env` file**

```bash
   cp .env.example .env
```

Fill in:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — long random string
- `JWT_EXPIRES_IN` — `30d`
- `PORT` — defaults to 5000 if omitted

3. **Start the server**

```bash
   npm run dev
```
You should see:
MongoDB connected: ...
TaskDuty API listening on port 5000 or whichever port u inserted into the .env file

---

## Testing with Postman
since we are still using local endpoint
Create new collection on postman
select new method such as: POST,PUT,GET,PATCH,DELETE
and add the following Endpoints with this http://localhost:5000/  to the Url space and send


## Endpoints

| Method | Route                                      | Access  | Description                                                     |
| ------ | ------------------------------------------ | ------- | --------------------------------------------------------------- |
| POST   | `/api/auth/register`                       | Public  | Create an account, returns a token                              |
| POST   | `/api/auth/login`                          | Public  | Log in, returns a token                                         |
| GET    | `/api/auth/me`                             | Private | Current user's profile                                          |
| GET    | `/api/tasks`                               | Private | All of the logged-in user's tasks                               |
| ___    | ___________________________________________| ________| _______________________________________                         |
| GET    | `/api/tasks/each/:id`                      | Private | A single task (only if you own it)                              |
| POST   | `/api/tasks/Create`                        | Private | Create a task (required: title, description, dueDate, category) |
| PATCH  | `/api/tasks/edit/:id`                      | Private | Update a task (only if you own it)                              |
| DELETE | `/api/tasks/delete/:id`                    | Private | Delete a task (only if you own it)                              |

"Private" routes require `Authorization: Bearer <token>`.

---

## Validation rules

- `title`, `description`, `dueDate`, and `category` are required when creating a task.
- `category` must be one of `Work`, `Personal`, `Urgent`.
- `dueDate` cannot be in the past (checked against the start of today). ISO Format - yyyy-mm-dd
- `email` must be unique across users; passwords are hashed with bcrypt and never returned in API responses.

---

## Example error responses

```json
// No token provided
{ "message": "Not authorized, no token provided" }

// Requesting another user's task, or one that doesn't exist
{ "message": "Task not found" }

// Creating a task with a due date in the past
{ "message": "Due date cannot be in the past" }

// Registering with an email already in use
{ "message": "An account with this email already exists" }
```

---

## Known Issues

**Errors aren't always handled consistently yet.** Right now, if something goes wrong inside a route, `express-async-handler` catches it and `errorHandler.ts` sends back a clean JSON error instead of crashing the server — which is good. But the actual status code (400 vs 500) depends entirely on whether we remembered to call `res.status(400)` *before* throwing the error.

**There's no way to log someone out from the server side.** Tokens last 3 days and the server has no memory of which tokens are "active" — it just checks "is this token valid?" every time. So logging out really just means throwing the token away on whatever device or tool is using it (Postman, a future frontend, etc). If a token ever got leaked or a device got lost, there's currently no way to kill that specific token early — it just keeps working until it naturally expires on its own.

**Login and register have no protection against spamming.** Someone could hammer the login endpoint with thousands of password guesses per second right now and nothing would slow them down. but it's the kind of thing i'd fix with rate limiting before it ever touch real users.

**No "verify your email" step, and no password reset.** You can sign up with literally any email address, real or fake, and there's no "forgot password" flow if someone loses access to their account.. this because its still in test mode and its only server side activated

**Everyone has equal permissions — there's no admin.** The only thing deciding what you can touch is whether you own it. There's no concept of a special "admin" user who can see everyone's tasks, moderate content, or do anything beyond what a regular user can do to their own stuff.


---

## Possible Next Steps

- Decide between the custom `AuthRequest` type and global `Request` augmentation, and standardize on one going forward
- Add rate limiting on auth routes (e.g. `express-rate-limit`)
- Add refresh tokens and/or a token blacklist for real logout support
- Add email verification and password reset flows
- and many more i can't put down now

```diff
- Not Integrated with Client-Side Yet
```