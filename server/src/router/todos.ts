import { Router } from "express";
import {
  getTodos,
  updateTodo,
  deleteTodo,
  addTodo,
  getTodo,
} from "../controller/todos";

const router = Router();

router.post("/", addTodo);
router.get("/:id", getTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
