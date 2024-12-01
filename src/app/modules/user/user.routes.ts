import { Router } from "express";
import { UserController } from "./user.controller";
import requestValidator from "../../middleware/requestValidator";
import { studentValidator } from "../student/student.validator";

const router = Router();

router.post(
   "/create-student",
   requestValidator(studentValidator.createStudentSchema),
   UserController.createStudent,
);

export const UserRouter = router;
