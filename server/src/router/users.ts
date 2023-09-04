import { Router } from "express";
import todoRouter from "./todos";
import { deleteUser, updateUser, getUser } from "../controller/users";
import { isAuthenticated } from "../middleware/AuthenticationCheck";

const router = Router();

router.use("/todo", isAuthenticated, todoRouter);

router.get("/", isAuthenticated, getUser);
router.delete("/", isAuthenticated, deleteUser);
router.patch("/", isAuthenticated, updateUser);

export default router;
