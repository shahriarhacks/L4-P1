import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import responder from "../../utils/responder";
import { IStudent } from "../student/student.interface";

const createStudent = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const { password, ...student } = req.body;
      const result = await UserService.createStudent(password, student);

      responder<IStudent | undefined>(res, {
         statuscode: 201,
         success: true,
         message: "Student created successfully",
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

export const UserController = { createStudent };
