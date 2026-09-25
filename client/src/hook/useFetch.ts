import { useState, useEffect, useCallback } from "react";
import type { Task, NewTaskInput } from "../types/task";

const Storage = "taskduty.tasks";

const seedTasks: Task[] = [
  {
    id: "t1",
    title: "FinTech Website Update",
    description:
      "Refresh the pricing page copy and swap in the new brand palette across the marketing site.",
    dueDate: "2026-10-02",
    category: "Urgent",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Agro Website Update",
    description:
      "Add the harvest-season case study and fix the broken contact form on mobile.",
    dueDate: "2026-10-10",
    category: "Work",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "t3",
    title: "Book dentist appointment",
    description: "Call the clinic and find a slot before the end of the month.",
    dueDate: "2026-09-29",
    category: "Personal",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(Storage);
    if (!raw) return seedTasks;
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedTasks;
  } catch {
    return seedTasks;
  }
}

/**
 * useTasks centralizes all task state: loading, persisting, and the
 * create / update / delete / toggle operations every page needs.
 * Swap the body of these functions for real API calls later without
 * touching any page component.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTasks(loadTasks());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.localStorage.setItem(Storage, JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const getTask = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks],
  );

  const addTask = useCallback((input: NewTaskInput) => {
    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, input: NewTaskInput) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...input } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  return {
    tasks,
    isLoading,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}
