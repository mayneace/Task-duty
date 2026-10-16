import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#6C4CE0] text-white"
      : "text-[#6B6785] hover:bg-[#F1EEFA] hover:text-[#171332]"
  }`;

const AdminLayout: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-medium text-[#171332]">
          Admin
        </h1>
        <Link to="/myTask" className="text-sm font-semibold text-[#6C4CE0]">
          ← Back to My Tasks
        </Link>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2 rounded-full border border-[#E3E0ED] bg-white p-1.5 w-fit">
        {/* `end` stops "Dashboard" from staying highlighted on /admin/users */}
        <NavLink to="/admin" end className={tabClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={tabClass}>
          Users
        </NavLink>
        <NavLink to="/admin/tasks" className={tabClass}>
          Tasks
        </NavLink>
      </nav>

      {/* The active child page renders here */}
      <Outlet />
    </section>
  );
};

export default AdminLayout;
