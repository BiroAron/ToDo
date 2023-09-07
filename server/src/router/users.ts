import { Router } from "express";
import todoRouter from "./todos";
import { UserController } from "../controller/users";
import { isAuthenticated } from "../middleware/AuthenticationCheck";

const router = Router();

router.use("/todo", isAuthenticated, todoRouter);

router.get("/", isAuthenticated, UserController.getUser);

export default router;
