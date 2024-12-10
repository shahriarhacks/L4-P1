import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { AcademicFacultyValidator } from "./academicFaculty.validator";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.post(
   "/create",
   requestValidator(AcademicFacultyValidator.createSchema),
   AcademicFacultyController.createAcademicFaculty,
);

export const AcademicFacultyRouter = router;
