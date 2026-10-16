import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import type { AdminUser, AdminTask } from "../../types/task";
import RollerLoader from "../../components/RollerLoader";

const StatCard: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="rounded-xl border border-[#E3E0ED] bg-white p-5">
    <p className="text-sm text-[#8B87A3]">{label}</p>
    <p className="mt-1 font-serif text-3xl font-medium text-[#171332]">
      {value}
    </p>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/admin/users"), api.get("/admin/tasks")])
      .then(([u, t]) => {
        setUsers(u.data.users);
        setTasks(t.data.tasks);
      })
      .catch(() => toast.error("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <RollerLoader />;

  const completed = tasks.filter((t) => t.completed).length;
  const byCategory = (cat: string) =>
    tasks.filter((t) => t.category === cat).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total users" value={users.length} />
        <StatCard
          label="Admins"
          value={users.filter((u) => u.role === "admin").length}
        />
        <StatCard label="Total tasks" value={tasks.length} />
        <StatCard label="Completed" value={completed} />
      </div>

      <div>
        <h2 className="mb-3 font-serif text-xl font-medium text-[#171332]">
          Tasks by category
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Work" value={byCategory("Work")} />
          <StatCard label="Personal" value={byCategory("Personal")} />
          <StatCard label="Urgent" value={byCategory("Urgent")} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
