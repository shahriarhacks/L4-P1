import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { AcademicFacultyValidator } from "./academicFaculty.validator";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.post(
   "/create",
   requestValidator(AcademicFacultyValidator.validatorSchema),
   AcademicFacultyController.createAcademicFaculty,
);

router.get("/:id", AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
   "/:id",
   requestValidator(AcademicFacultyValidator.validatorSchema),
   AcademicFacultyController.updateAcademicFaculty,
);

router.get("/", AcademicFacultyController.getAllAcademicFaculty);

export const AcademicFacultyRouter = router;
