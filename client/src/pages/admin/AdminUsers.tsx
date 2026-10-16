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
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data.users))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!pendingDelete) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleting) setPendingDelete(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pendingDelete, deleting]);

  const changeRole = async (id: string, role: "user" | "admin") => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Could not update role");
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/users/${pendingDelete.id}`);
      setUsers((prev) => prev.filter((u) => u._id !== pendingDelete.id));
      toast.success("User deleted");
      setPendingDelete(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Could not delete user");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <RollerLoader />;

  return (
    <>
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
                      onClick={() =>
                        setPendingDelete({ id: u._id, name: u.name })
                      }
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

      {pendingDelete && (
        <div
          onClick={() => !deleting && setPendingDelete(null)}
          className="fixed inset-0 z-20 flex items-center justify-center bg-[#1b1326]/30 p-4 backdrop-blur-sm md:left-64"
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-[#E3E0ED] bg-white p-6 shadow-xl"
          >
            <h3 className="font-serif text-xl font-medium text-[#171332]">
              Delete user?
            </h3>
            <p className="mt-2 text-sm text-[#6B6785]">
              This will permanently delete{" "}
              <span className="font-semibold text-[#171332]">
                {pendingDelete.name}
              </span>{" "}
              and all of their tasks. This can't be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={deleting}
                className="cursor-pointer rounded-lg border border-[#E3E0ED] px-4 py-2 text-sm font-medium text-[#6B6785] hover:bg-[#F6F3FB] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="cursor-pointer rounded-lg bg-[#E0654C] px-4 py-2 text-sm font-medium text-white hover:bg-[#c9543d] disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
