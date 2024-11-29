import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.post("/create", StudentControllers.createStudent);

export const StudentRouter = router;
