import { Router } from "express";
import {
  getAllTodos,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../controller/todos";
//import { extractUserId } from "../middleware/index";

const router = Router();

router.post("/add-todo", addTodo);
router.get("/get-all-todos", getAllTodos);
router.patch("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
