import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { AcademicSemesterRouter } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.routes";

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
      path: "/academic-semesters",
      route: AcademicSemesterRouter,
   },
   {
      path: "/academic-faculties",
      route: AcademicFacultyRouter,
   },
];

moduleRouters.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
