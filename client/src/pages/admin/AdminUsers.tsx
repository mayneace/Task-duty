import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import type { AdminUser } from "../../types/task";
import RollerLoader from "../../components/RollerLoader";

const AdminUsers: React.FC = () => {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data.users))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const changeRole = async (id: string, role: "user" | "admin") => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Could not update role");
    }
  };

  const removeUser = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Delete ${name} and all of their tasks? This can't be undone.`,
      )
    )
      return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Could not delete user");
    }
  };

  if (loading) return <RollerLoader />;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#E3E0ED] bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[#E3E0ED] text-[#8B87A3]">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isMe = u._id === me?._id;
            return (
              <tr
                key={u._id}
                className="border-b border-[#E3E0ED] last:border-0"
              >
                <td className="px-4 py-3 text-[#171332]">
                  {u.name}{" "}
                  {isMe && (
                    <span className="text-xs text-[#8B87A3]">(you)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#6B6785]">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    disabled={isMe}
                    onChange={(e) =>
                      changeRole(u._id, e.target.value as "user" | "admin")
                    }
                    className="rounded-md border border-[#E3E0ED] bg-white px-2 py-1 disabled:opacity-50"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-[#6B6785]">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    disabled={isMe}
                    onClick={() => removeUser(u._id, u.name)}
                    className="cursor-pointer rounded-md border border-[#E3E0ED] px-3 py-1 text-xs font-medium text-[#E0654C] hover:bg-[#FDEEEA] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
