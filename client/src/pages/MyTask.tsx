import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../hook/useFetch";
import Task from "../components/Task";
import { Categories, type TaskCategory } from "../types/task";

type Filter = "all" | "active" | "completed";

const MyTask: React.FC = () => {
  const { tasks, isLoading, toggleComplete, deleteTask } = useTasks();
  const [categoryFilter, setFilter] = useState<TaskCategory | "all">("all");
  const [Filter, setCompletionFilter] = useState<Filter>("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;
      const matchesCompletion =
        Filter === "all" ||
        (Filter === "completed" ? task.completed : !task.completed);
      return matchesCategory && matchesCompletion;
    });
  }, [tasks, categoryFilter, Filter]);
  return (
    <section className="flex flex-col justify-center mt-15 gap-2 pb-12 px-6 sm:px-[clamp(1rem,11.40vw,200px)]">
      <div className="flex justify-between w-full items-center">
        <h2 className="font-medium text-4xl text-[#292929]">My Tasks</h2>

        <Link
          to="/newTask"
          className="flex items-center gap-1.5 text-sm font-semibold text-[#6C4CE0] hover:text-[#5C3ED6]"
        >
          <span className="text-lg leading-none">+</span> Add New Task
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border-b-2 border-white bg-linear-to-b from-gray-300/10 via-gray-400/20 to-gray-300/10 backdrop-blur-xs sm:backdrop-blur-sm transition-all duration-300 transform group shadow-[0_6px_25px_rgba(0,0,0,0.10)] inset-shadow-sm p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border px-2 py-1.5 text-xs font-medium transition-colors ${
              categoryFilter === "all"
                ? "border-transparent bg-linear-to-b from-[#dbb5fa] via-[#974FD0] to-[#d7a7fe] text-white"
                : "border-[#E3E0ED] text-[#6B6785] hover:border-[#C9C4DE] bg-linear-to-b from-gray-300/50 via-gray-400/10 to-gray-300/30"
            }`}
          >
            All categories
          </button>
          {Categories.map((cat) => {
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex items-center gap-1.5 rounded-2xl border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-transparent  bg-linear-to-b from-[#dbb5fa] via-[#974FD0] to-[#d7a7fe] text-white"
                    : "border-[#E3E0ED] text-[#6B6785] hover:border-[#C9C4DE] bg-linear-to-b from-gray-300/50 via-gray-400/10 to-gray-300/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 border-t border-black/20 pt-3 sm:border-t-0 sm:pt-0 sm:pl-4 sm:border-l">
          {(["all", "active", "completed"] as Filter[]).map((option) => (
            <button
              key={option}
              onClick={() => setCompletionFilter(option)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                Filter === option
                  ? "bg-white text-[#6C4CE0] hover:text-[#4f24ea]"
                  : "text-[#6B6785] hover:text-[#171332]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-sm text-[#8B87A3]">Loading tasks…</p>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#E3E0ED] bg-white px-6 py-16 text-center">
          <p className="font-serif text-lg font-medium text-[#171332]">
            Nothing here yet
          </p>
          <p className="mt-1.5 text-sm text-[#8B87A3]">
            Try a different filter, or add a task to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium text-[#6C4CE0] hover:underline"
        >
          Back To Top
        </button>
      </div>
    </section>
  );
};

export default MyTask;
