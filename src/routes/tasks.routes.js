import { Router } from "express";
import {
  deleteTask,
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.get("/tasks", getAllTasks);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

router.get("/tasks/:id", getSingleTask);

export default router;
