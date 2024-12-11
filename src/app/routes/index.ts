import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { AcademicSemesterRouter } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.routes";
import { StudentRouter } from "../modules/student/student.routes";

interface IModuleRouter {
   path: string;
   route: Router;
}

const router = Router();

const moduleRouters: IModuleRouter[] = [
   {
      path: "/users",
      route: UserRouter,
   },
   {
      path: "/students",
      route: StudentRouter,
   },
   {
      path: "/academic-semesters",
      route: AcademicSemesterRouter,
   },
   {
      path: "/academic-faculties",
      route: AcademicFacultyRouter,
   },
   {
      path: "/academic-departments",
      route: AcademicDepartmentRouter,
   },
];

moduleRouters.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
