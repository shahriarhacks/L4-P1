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

router.get("/:id", AcademicSemesterController.getSingleStudent);
router.patch(
   "/:id",
   requestValidator(AcademicSemesterValidator.updateSchema),
   AcademicSemesterController.updateAcademicSemester,
);

router.get("/", AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRouter = router;
