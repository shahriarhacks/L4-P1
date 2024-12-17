import { Router } from "express";
import { UserController } from "./user.controller";
import requestValidator from "../../middleware/requestValidator";
import { studentValidator } from "../student/student.validator";
import { facultyValidator } from "../faculty/faculty.validator";

const router = Router();

router.post(
   "/create-student",
   requestValidator(studentValidator.createStudentValidationSchema),
   UserController.createStudent,
);
router.post(
   "/create-faculty",
   requestValidator(facultyValidator.createFacultyValidationSchema),
   UserController.createFaculty,
);

export const UserRouter = router;
