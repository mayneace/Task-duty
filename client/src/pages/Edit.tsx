import React from "react";
// import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
// import { Link } from "react-router-dom";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hook/useFetch";
import type { NewTaskInput } from "../types/task";

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getTask, updateTask, isLoading } = useTasks();

  const task = id ? getTask(id) : undefined;

  if (!isLoading && !task) {
    return <Navigate to="/myTask" replace />;
  }

  const handleSubmit = (input: NewTaskInput) => {
    if (id) updateTask(id, input);
  };

  return (
    <section className="flex flex-col gap-4 px-6 py-14 sm:px-[clamp(1rem,11.40vw,200px)]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 font-serif text-4xl cursor-pointer font-medium text-[#171332]"
      >
        <span className="animate-pulse">‹</span> Edit Task
      </button>

      {task && (
        <TaskForm mode="edit" initialTask={task} onSubmit={handleSubmit} />
      )}
    </section>
  );
};
export default Edit;
