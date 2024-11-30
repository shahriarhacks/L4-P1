import { RequestHandler } from "express";
import { UserService } from "./user.service";
import responder from "../../utils/responder";
import { IStudent } from "../student/student.interface";
import asyncHandler from "../../utils/asyncHandler";

const createStudent: RequestHandler = asyncHandler(async (req, res) => {
   const { password, ...student } = req.body;
   const result = await UserService.createStudent(password, student);

   responder<IStudent | undefined>(res, {
      statuscode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

export const UserController = { createStudent };
