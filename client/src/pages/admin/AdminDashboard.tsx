import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import api from "../../services/api";
// import type { AdminUser, AdminTask } from "../../types/task";
// import RollerLoader from "../../components/RollerLoader";
import type { IconType } from "react-icons";
import { NavLink, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MdChecklist,
  MdClose,
  MdDashboard,
  MdLogout,
  MdMenu,
  MdOutlineStorefront,
  MdPeople,
} from "react-icons/md";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
}

const navItems: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: MdDashboard, end: true },
  { to: "/admin/tasks", label: "Tasks", icon: MdChecklist },
  { to: "/admin/users", label: "Users", icon: MdPeople },
];
 
interface SidebarProps {
  name: string;
  email: string;
  onNavigate: () => void;
  onLogout: () => void;
}

// Shared by the desktop sidebar and the mobile drawer
const SidebarContent: React.FC<SidebarProps> = ({
  name,
  email,
  onNavigate,
  onLogout,
}) => (
  <div className="flex h-full flex-col text-white">
    {/* Brand */}
    <div className="flex flex-col items-center gap-2 border-b border-white/10 px-6 py-7">
      <div className="flex items-center gap-3">
        <img src={logo} alt="" className="w-8" />
        <span className="text-2xl font-semibold tracking-wide">TaskDuty</span>
      </div>
      <span className="text-xs tracking-[0.3em] text-white/50">ADMIN PANEL</span>
    </div>
 
    {/* Signed-in admin */}
    <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#974FD0] font-semibold shadow-[0_0_20px_rgba(151,79,208,0.6)]">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold">{name}</p>
        <p className="truncate text-sm text-white/50">{email}</p>
      </div>
    </div>
 
    {/* Links */}
    <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all duration-300 ${
              isActive
                ? "bg-[#974FD0] text-white shadow-[0_8px_24px_rgba(151,79,208,0.45)]"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Icon className="text-xl" />
          {label}
        </NavLink>
      ))}
    </nav>
 
    {/* Footer actions */}
    <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-5">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <MdOutlineStorefront className="text-xl" />
        View Site
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
      >
        <MdLogout className="text-xl" />
        Logout
      </button>
    </div>
  </div>
);



// const StatCard: React.FC<{ label: string; value: number }> = ({
//   label,
//   value,
// }) => (
//   <div className="rounded-xl border border-[#E3E0ED] bg-white p-5">
//     <p className="text-sm text-[#8B87A3]">{label}</p>
//     <p className="mt-1 font-serif text-3xl font-medium text-[#171332]">
//       {value}
//     </p>
//   </div>
// );

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
 
  const name = user?.name ?? "Admin";
  const email = user?.email ?? "";
 
  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };
 
  // Close the drawer when the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
 
  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
 
  const sidebarProps: SidebarProps = {
    name,
    email,
    onNavigate: () => setOpen(false),
    onLogout: handleLogout,
  };

// -----------------------------------------------
//   const [users, setUsers] = useState<AdminUser[]>([]);
//   const [tasks, setTasks] = useState<AdminTask[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([api.get("/admin/users"), api.get("/admin/tasks")])
//       .then(([u, t]) => {
//         setUsers(u.data.users);
//         setTasks(t.data.tasks);
//       })
//       .catch(() => toast.error("Failed to load dashboard data"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <RollerLoader />;

//   const completed = tasks.filter((t) => t.completed).length;
//   const byCategory = (cat: string) =>
//     tasks.filter((t) => t.category === cat).length;
//   ......................................

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F6F3FB]">
      {/* Soft colour blobs: these are what the glass panels blur against */}
      <div className="pointer-events-none fixed -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-[#974FD0]/30 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-32 right-0 -z-10 h-112 w-md rounded-full bg-[#c9a4ee]/50 blur-3xl" />
      <div className="pointer-events-none fixed left-1/2 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#7333a8]/20 blur-3xl" />
 
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-[#1b1326]/80 shadow-[8px_0_40px_rgba(27,19,38,0.25)] backdrop-blur-2xl md:block">
        <SidebarContent {...sidebarProps} />
      </aside>
 
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/70 bg-white/60 px-5 py-4 backdrop-blur-xl md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="cursor-pointer text-2xl text-[#7333a8]"
        >
          <MdMenu />
        </button>
        <span className="text-sm font-semibold tracking-[0.35em] text-[#292929]">
          ADMIN
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#974FD0] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(151,79,208,0.5)]">
          {name.charAt(0).toUpperCase()}
        </div>
      </header>
 
      {/* Mobile drawer */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-[#1b1326]/30 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#1b1326]/90 backdrop-blur-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-4 top-4 cursor-pointer text-2xl text-white/60 hover:text-white"
        >
          <MdClose />
        </button>
        <SidebarContent {...sidebarProps} />
      </aside>
 
      {/* Page content */}
      <main className="relative z-10 px-5 py-8 md:pl-72 md:pr-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
