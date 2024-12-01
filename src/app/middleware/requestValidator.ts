import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const requestValidator =
   (schema: AnyZodObject) =>
   async (req: Request, _res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
         });
         next();
      } catch (error) {
         next(error);
      }
   };

export default requestValidator;