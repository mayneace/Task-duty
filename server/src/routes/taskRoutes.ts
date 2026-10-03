import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { protect } from "../middleware/auth";

const router = Router();

// Route token
router.use(protect);

router.post("/create", createTask);
router.get("/", getTasks);
router.get("/each/:id", getTaskById);
router.put("/edit/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
