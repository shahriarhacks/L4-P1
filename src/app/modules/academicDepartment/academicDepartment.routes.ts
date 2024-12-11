import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import { AcademicDepartmentValidator } from "./academicDepartment.validator";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.post(
   "/create",
   requestValidator(AcademicDepartmentValidator.createSchema),
   AcademicDepartmentController.createAcademicDepartment,
);

router.get("/:id", AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
   "/:id",
   requestValidator(AcademicDepartmentValidator.updateSchema),
   AcademicDepartmentController.updateAcademicDepartment,
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);

export const AcademicDepartmentRouter = router;
