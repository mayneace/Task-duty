import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NewTaskInput, Task, TaskCategory } from "../types/task";
import { Categories } from "../types/task";

interface TaskFormProps {
  mode: "new" | "edit";
  initialTask?: Task;
  onSubmit: (input: NewTaskInput) => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
  category?: string;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

const TaskForm: React.FC<TaskFormProps> = ({ mode, initialTask, onSubmit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? "",
  );
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");
  const [category, setCategory] = useState<TaskCategory | "">(
    initialTask?.category ?? "",
  );
  const [completed, setCompleted] = useState(initialTask?.completed ?? false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!title.trim()) nextErrors.title = "Give the task a title.";
    if (!description.trim())
      nextErrors.description = "Add a short description.";
    if (!dueDate) {
      nextErrors.dueDate = "Pick a due date.";
    } else if (dueDate < todayISO()) {
      nextErrors.dueDate = "Due date can't be in the past.";
    }
    if (!category) nextErrors.category = "Choose a category.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || !category) return;

    onSubmit({ title, description, dueDate, category, completed });
    navigate("/myTask");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6">
      {/* Task Title */}
      <div className="text-left">
        <label
          htmlFor="title"
          className="mb-2 w-full text-sm font-medium text-[#6B6785]"
        >
          Task Title
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Project Defense, Assignment..."
          className={`w-full rounded-lg border bg-white px-4 py-3 text-[#171332] placeholder:text-[#B4B0C8]/50 focus:outline-none focus:ring-2 ${
            errors.title
              ? "border-[#E0654C] focus:ring-[#E0654C]/30"
              : "border-[#E3E0ED] focus:ring-[#6C4CE0]/30"
          }`}
        />
        {errors.title && (
          <p className="mt-1.5 text-xs text-[#E0654C]">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="text-left">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-[#6B6785]"
        >
          Description
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Briefly describe your task..."
          rows={7}
          className={`w-full resize-none rounded-lg border bg-white px-4 py-3 leading-relaxed text-[#171332] placeholder:text-[#B4B0C8]/50 focus:outline-none focus:ring-2 ${
            errors.description
              ? "border-[#E0654C] focus:ring-[#E0654C]/30"
              : "border-[#E3E0ED] focus:ring-[#6C4CE0]/30"
          }`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs text-[#E0654C]">{errors.description}</p>
        )}
      </div>

      {/* Due date + category */}
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
        <div className="flex flex-col">
          <label
            htmlFor="dueDate"
            className="mb-2 text-sm font-medium text-[#6B6785]"
          >
            Due Date:
          </label>
          <input
            id="dueDate"
            type="date"
            required
            value={dueDate}
            min={todayISO()}
            // placeholder="date-month-year"
            onChange={(event) => setDueDate(event.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-[#171332]/50 focus:outline-none focus:ring-2 ${
              errors.dueDate
                ? "border-[#E0654C] focus:ring-[#E0654C]/30"
                : "border-[#E3E0ED] focus:ring-[#6C4CE0]/30"
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1.5 text-xs text-[#E0654C]">{errors.dueDate}</p>
          )}
        </div>

        <div className="flex flex-col">
          <span className="pb-2 text-sm font-medium text-[#6B6785]">
            Category:
          </span>
          <div className="flex items-center justify-center gap-3 pt-1">
            {Categories.map((option) => {
              const active = category === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? `border-transparent bg-[#171332]/60 text-white`
                      : "border-[#E3E0ED] text-[#6B6785] hover:border-[#C9C4DE]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errors.category && (
            <p className="mt-1.5 text-xs text-[#E0654C]">{errors.category}</p>
          )}
        </div>
      </div>

      {/* Completion flag, only meaningful once a task already exists */}
      {mode === "edit" && (
        <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-[#6B6785]">
          <span
            onClick={() => setCompleted((prev) => !prev)}
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
              completed ? "bg-[#3FA796]" : "bg-[#E3E0ED]"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                completed ? "translate-x-4" : ""
              }`}
            />
          </span>
          Mark as completed
        </label>
      )}

      <button
        type="submit"
        className="flex items-center justify-center py-2.5 px-7 rounded-xl bg-linear-to-b from-[#dbb5fa] via-[#974FD0] to-[#d7a7fe] text-white cursor-pointer border-b-2 border-white/70 transition-all duration-300 transform hover:scale-102 active:scale-100 shadow-[0_10px_35px_rgba(0,0,0,0.13)] backdrop-blur-xs"
      >
        Done
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="block md:hidden text-center mt-10 text-sm font-medium text-[#6C4CE0] hover:underline"
      >
        Back To Top
      </button>
    </form>
  );
};

export default TaskForm;
