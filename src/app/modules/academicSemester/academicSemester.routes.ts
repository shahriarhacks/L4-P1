import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { AcademicSemesterValidator } from "./academicSemester.validator";
import { AcademicSemesterController } from "./academicSemester.controller";

const router = Router();

router.post(
   "/create",
   requestValidator(AcademicSemesterValidator.createSchema),
   AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRouter = router;
