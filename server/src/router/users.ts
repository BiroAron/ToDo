import { Router } from "express";
import todoRouter from "./todos";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controller/users";
import { isAuthenticated } from "../middleware/index";
//import { extractUserId } from "../middleware/index";

const router = Router();

router.get("/get-all-users", isAuthenticated, getAllUsers);
router.get("/get-user", isAuthenticated, getUser);
router.delete("/delete-user", isAuthenticated, deleteUser);
router.patch("/update-user", isAuthenticated, updateUser);

router.use(isAuthenticated, todoRouter);

export default router;
