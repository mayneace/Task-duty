import React from "react";
import { Link } from "react-router-dom";
import tsk from "../assets/Property 1=Frame 1.png";
import { useAuth } from "../context/AuthContext";

const cover: React.FC = () => {
  const { user } = useAuth();
  return (
    <section className="flex my-10 px-6 sm:px-[clamp(1rem,11.40vw,200px)]">
      <div className="flex flex-col-reverse lg:flex-row items-center w-full gap-10">
        <div className="flex flex-col w-full lg:w-1/2 items-start gap-6 text-left px-4">
          <span className="rounded-full border-b-2 border-white bg-linear-to-b from-gray-300/50 via-gray-400/10 to-gray-300/30 backdrop-blur-xs sm:backdrop-blur-sm tracking-wide px-4 py-1.5 text-xs font-medium text-[#6B6785]/80 shadow-[0_6px_25px_rgba(0,0,0,0.10)] ">
            Let's keep your day in order
          </span>

          <h1 className="font-medium text-4xl lg:text-5xl leading-tight tracking-tighter text-[#292929]">
            Manage your Tasks on <br className="lg:hidden" />{" "}
            <span className="text-[#974FD0]">TaskDuty</span>
          </h1>

          <p className="font-normal text-xl text-[#292929]/60 tracking-tighter">
            Write down what you need to do, set a due date, toss it in a
            category then check it off when you're done. No boards, no fuss{" "}
            <br />— keeping your daily activities in order.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {user ? (
              <>
                <Link
                  to="/myTask"
                  className="rounded-lg bg-[#6C4CE0] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5C3ED6]"
                >
                  Go to My Tasks
                </Link>
                <Link
                  to="/newTask"
                  className="rounded-lg border border-[#E3E0ED] bg-white px-6 py-3.5 text-sm font-semibold text-[#171332] transition-colors hover:border-[#C9C4DE]"
                >
                  Add a task
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="rounded-lg bg-[#6C4CE0] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5C3ED6]"
                >
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg border border-[#E3E0ED] bg-white px-6 py-3.5 text-sm font-semibold text-[#171332] transition-colors hover:border-[#C9C4DE]"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        <img src={tsk} alt="" className="w-full lg:w-150" />
      </div>
    </section>
  );
};

export default cover;
