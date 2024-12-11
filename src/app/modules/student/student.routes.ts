import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router.get("/:uid", StudentController.getSingleStudent);
router.delete("/:uid", StudentController.deletedStudent);

router.get("/", StudentController.getAllStudents);

export const StudentRouter = router;
