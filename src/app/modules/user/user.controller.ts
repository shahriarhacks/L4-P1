import { UserService } from "./user.service";
import responder from "../../utils/responder";
import { IStudent } from "../student/student.interface";
import asyncHandler from "../../utils/asyncHandler";

const createStudent = asyncHandler(async (req, res) => {
   const { password, ...student } = req.body;
   const result = await UserService.createStudentIntoDB(password, student);

   responder<IStudent | undefined>(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

export const UserController = { createStudent };
