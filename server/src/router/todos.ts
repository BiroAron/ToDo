import { Router } from "express";
import {
  getAllTodos,
  updateTodo,
  deleteTodo,
  addTodo,
  getSingleTodo,
} from "../controller/todos";

const router = Router();

router.post("/", addTodo);
router.get("/", getAllTodos);
router.get("/:id", getSingleTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
