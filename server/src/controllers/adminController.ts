import { Response } from "express";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/auth";

// GET /api/admin/users
const getAllUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const users = await User.find().sort({ createdAt: -1 }); // password is select:false
  res.status(200).json({ message: "Users retrieved successfully", users });
});

// GET /api/admin/tasks  all user's tasks
const getAllTasks = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const tasks = await Task.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email");
  res.status(200).json({ message: "All tasks retrieved successfully", tasks });
});

// PATCH /api/admin/users/:id/role   body: role: admin / user
const updateUserRole = asyncHandler(
  async (
    req: AuthRequest<{ id: string }, unknown, { role?: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid user id");
    }
    if (role !== "user" && role !== "admin") {
      res.status(400);
      throw new Error('Role must be "user" or "admin"');
    }
    // Stops the last admin from locking everyone out
    if (id === req.user!._id.toString()) {
      res.status(400);
      throw new Error("You can't change your own role");
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  },
);

// DELETE /api/admin/users/:id  (also removes that user's tasks)
const deleteUser = asyncHandler(
  async (req: AuthRequest<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid user id");
    }
    if (id === req.user!._id.toString()) {
      res.status(400);
      throw new Error("You can't delete your own account");
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await Task.deleteMany({ user: id }); // don't leave orphaned tasks behind
    res.status(200).json({ message: "User and their tasks deleted", id });
  },
);

export { getAllUsers, getAllTasks, updateUserRole, deleteUser };
