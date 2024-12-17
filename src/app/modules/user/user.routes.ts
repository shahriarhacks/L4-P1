import { Router } from "express";
import { UserController } from "./user.controller";
import requestValidator from "../../middleware/requestValidator";
import { studentValidator } from "../student/student.validator";
import { facultyValidator } from "../faculty/faculty.validator";
import { adminValidator } from "../admin/admin.validator";

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

router.post(
   "/create-admin",
   requestValidator(adminValidator.createAdminValidationSchema),
   UserController.createAdmin,
);

export const UserRouter = router;
