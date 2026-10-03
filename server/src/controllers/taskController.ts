import { Request, Response } from "express";
import mongoose, { QueryFilter } from "mongoose";
import asyncHandler from "express-async-handler";
import Task, { ITask } from "../models/Task";
import { TaskCategory, VALID_CATEGORIES } from "../types/task";
import { AuthRequest } from "../middleware/auth";

interface TaskBody {
  title?: string;
  description?: string;
  dueDate?: string;
  category?: TaskCategory;
  completed?: boolean;
}

function isPastDate(dueDate: string | Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

function isValidCategory(category: unknown): category is TaskCategory {
  return (
    typeof category === "string" &&
    (VALID_CATEGORIES as string[]).includes(category)
  );
}

// Get task
const getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const filter: QueryFilter<ITask> = { user: req.user!._id };

  const { category, completed } = req.query as {
    category?: string;
    completed?: string;
  };

  if (typeof category === "string") {
    filter.category = category as TaskCategory;
  }
  if (typeof completed === "string") {
    filter.completed = completed === "true";
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ message: "All Task Retrieved Successfully", tasks });
});

// Get task by :iD
const getTaskById = asyncHandler(
  async (req: AuthRequest<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid task id");
    }

    // Security Check by :iD
    const task = await Task.findOne({ _id: id, user: req.user!._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.status(200).json({ message: "Tasks retrieved successfullly", task });
  },
);

// Create Task
const createTask = asyncHandler(
  async (req: AuthRequest<unknown, unknown, TaskBody>, res: Response) => {
    const { title, description, dueDate, category, completed } = req.body;

    if (!title || !description || !dueDate || !category) {
      res.status(400);
      throw new Error(
        "Title, description, dueDate, and category are all required",
      );
    }

    if (!isValidCategory(category)) {
      res.status(400);
      throw new Error(
        `Category must be one of: ${VALID_CATEGORIES.join(", ")}`,
      );
    }

    if (isPastDate(dueDate)) {
      res.status(400);
      throw new Error("Due date cannot be in the past");
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      completed: Boolean(completed) || false,
      user: req.user!._id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  },
);

// Update Task
const updateTask = asyncHandler(
  async (
    req: AuthRequest<{ id: string }, unknown, TaskBody>,
    res: Response,
  ) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid task id");
    }

    const task = await Task.findOne({ _id: id, user: req.user!._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const { title, description, dueDate, category, completed } = req.body;

    if (category && !isValidCategory(category)) {
      res.status(400);
      throw new Error(
        `Category must be one of: ${VALID_CATEGORIES.join(", ")}`,
      );
    }

    if (dueDate && isPastDate(dueDate)) {
      res.status(400);
      throw new Error("Due date cannot be in the past");
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
    task.category = category ?? task.category;
    if (completed !== undefined) task.completed = Boolean(completed);

    const updatedTask = await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  },
);

// Delete Task
const deleteTask = asyncHandler(
  async (req: AuthRequest<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid task id");
    }

    const task = await Task.findOneAndDelete({ _id: id, user: req.user!._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ message: "Task deleted", id });
  },
);

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
