import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
   try {
      const student = req.body;
      const result = await StudentServices.createStudent(student);
      res.status(201).json({
         success: true,
         message: "Student created success!",
         data: result,
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({
         success: false,
         message: "Failed for error",
         error,
      });
   }
};

export const StudentControllers = { createStudent };
