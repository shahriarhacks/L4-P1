import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";

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
];

moduleRouters.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
