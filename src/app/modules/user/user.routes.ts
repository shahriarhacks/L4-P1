import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-student", UserController.createStudent);

export const UserRouter = router;
