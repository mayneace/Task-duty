import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import type { Task, NewTaskInput } from "../types/task";

const normalize = (t: any): Task => ({
  ...t,
  id: t._id,
  dueDate: String(t.dueDate).split("T")[0],
});

export function useTasks(search = "") {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false; // guard

    api
      .get("/tasks", { params: search ? { search } : {} }) // real list path
      .then((res) => {
        if (!ignore) setTasks(res.data.tasks.map(normalize));
      })
      .catch(() => {
        if (!ignore) setTasks([]);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [search]); // refetch

  const getTask = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks],
  );

  const addTask = async (input: NewTaskInput) => {
    const res = await api.post("/tasks/create", input);
    setTasks((prev) => [normalize(res.data.task), ...prev]);
  };

  const updateTask = async (id: string, input: Partial<NewTaskInput>) => {
    const res = await api.put(`/tasks/edit/${id}`, input);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? normalize(res.data.task) : t)),
    );
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/delete/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) await updateTask(id, { completed: !task.completed });
  };

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

// server task-routes
// router.post("/create", createTask);
// router.get("/", getTasks);
// router.get("/all/:id", getTaskById);
// router.put("/edit/:id", updateTask);
// router.delete("/delete/:id", deleteTask);
