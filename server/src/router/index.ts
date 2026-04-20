import { Router } from "express";
import authentication from "./authentication";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authentication);
router.use("/user", usersRouter);

export default router;
