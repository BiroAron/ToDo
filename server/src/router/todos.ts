import { Router } from "express";
import { TodoController } from "../controller/todos";

const router = Router();

router.post("/", TodoController.addTodo);
router.get("/:id", TodoController.getTodo);
router.get("/", TodoController.getTodos);
router.patch("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
