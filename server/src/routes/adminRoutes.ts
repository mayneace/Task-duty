import { Router } from "express";
import {
  getAllUsers,
  getAllTasks,
  updateUserRole,
  deleteUser,
} from "../controllers/adminController";
import { protect, authorize } from "../middleware/auth";

const router = Router();

// Order matters: log in first, then check the role
router.use(protect, authorize("admin"));

router.get("/users", getAllUsers);
router.get("/tasks", getAllTasks);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
