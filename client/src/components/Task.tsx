import React from "react";
// import { LiaEdit } from "react-icons/lia";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Task as TaskType } from "../types/task";
import { styles } from "../types/task";
// import { FaRegCheckCircle } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

interface TaskProps {
  task: TaskType;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function formatDateStub(dueDate: string) {
  const date = new Date(`${dueDate}T00:00:00`);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return { month, day };
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onDelete }) => {
  const navigate = useNavigate();
  const { month, day } = formatDateStub(task.dueDate);
  const style = styles[task.category];

  return (
    <div
      className={`flex justify-between gap-6 border-b-2 border-white bg-linear-to-b from-gray-300/10 via-gray-400/10 to-gray-300/10 backdrop-blur-xs sm:backdrop-blur-sm transition-all duration-300 transform group rounded-xl px-5 shadow-[0_6px_25px_rgba(0,0,0,0.10)] py-5 ${task.completed ? "opacity-60" : ""}`}
    >
      {/* Date */}
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-[#E3E0ED] bg-[#FAF9FC]">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8B87A3]">
          {month}
        </span>
        <span className="font-serif text-lg font-semibold text-[#171332]">
          {day}
        </span>
      </div>

      <div className="flex flex-col justify-between items-start gap-2 w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium tracking-wider ${style.text}`}
              >
                {task.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-50 duration-300 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => navigate(`/editTask/${task.id}`)}
              className="rounded-md border border-[#E3E0ED] px-3 py-1 text-xs font-medium text-[#171332] hover:bg-[#FAF9FC]"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="rounded-md border border-[#E3E0ED] px-3 py-1 text-xs font-medium text-[#E0654C] hover:bg-[#FDEEEA]"
            >
              Delete
            </button>
          </div>
        </div>

        <button
          onClick={() => onToggleComplete(task.id)}
          className="flex items-start gap-3 text-left"
        >
          <span
            className={`mt-1 flex h-4 w-4 shrink-0 items-center transform transition-all duration-300 justify-center rounded-full border ${
              task.completed
                ? "border-[#000000] bg-[#fcfcfc]"
                : "border-[#C9C4DE]"
            }`}
          >
            {task.completed && <BsCheckCircleFill />}
          </span>
          <span
            className={`font-serif text-base font-medium text-[#171332] ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </span>
        </button>

        {/* <hr className="border-x border-gray-300 w-full" /> */}

        <div className="text-center px-5 py-5 flex flex-col gap-5">
          <p className="pl-7 text-sm leading-relaxed text-[#6B6785]">
            {task.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
