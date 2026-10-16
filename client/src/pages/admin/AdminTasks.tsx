import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import type { AdminTask } from "../../types/task";
import RollerLoader from "../../components/RollerLoader";

const AdminTasks: React.FC = () => {
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get("/admin/tasks")
      .then((res) => setTasks(res.data.tasks))
      .catch(() => toast.error("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  // Filter by task title or owner name/email
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.user?.name.toLowerCase().includes(q) ||
        t.user?.email.toLowerCase().includes(q),
    );
  }, [tasks, query]);

  if (loading) return <RollerLoader />;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by task title or owner..."
        className="w-full rounded-lg border border-[#E3E0ED] bg-white px-4 py-3 sm:w-80"
      />

      <div className="overflow-x-auto rounded-xl border border-[#E3E0ED] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E3E0ED] text-[#8B87A3]">
            <tr>
              <th className="px-4 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t._id} className="border-b border-[#E3E0ED] last:border-0">
                <td className="px-4 py-3 text-[#171332]">{t.title}</td>
                <td className="px-4 py-3 text-[#6B6785]">
                  {t.user ? `${t.user.name} (${t.user.email})` : "Deleted user"}
                </td>
                <td className="px-4 py-3 text-[#6B6785]">{t.category}</td>
                <td className="px-4 py-3 text-[#6B6785]">
                  {new Date(t.dueDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={t.completed ? "text-[#3FA796]" : "text-[#6B6785]"}>
                    {t.completed ? "Completed" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-[#8B87A3]">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTasks;