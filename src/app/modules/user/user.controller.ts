import { UserService } from "./user.service";
import responder from "../../utils/responder";
import { IStudent } from "../student/student.interface";
import asyncHandler from "../../utils/asyncHandler";
import { IFaculty } from "../faculty/faculty.interface";
import { IAdmin } from "../admin/admin.interface";

const createStudent = asyncHandler(async (req, res) => {
   const { password, ...student } = req.body;
   const result = await UserService.createStudentIntoDB(password, student);

   responder<IStudent>(res, {
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

const createFaculty = asyncHandler(async (req, res) => {
   const { password, ...faculty } = req.body;
   const result = await UserService.createFacultyIntoDB(password, faculty);

   responder<IFaculty>(res, {
      statusCode: 201,
      success: true,
      message: "Faculty created successfully",
      data: result,
   });
});

const createAdmin = asyncHandler(async (req, res) => {
   const { password, ...admin } = req.body;
   const result = await UserService.createAdminIntoDB(password, admin);

   responder<IAdmin>(res, {
      statusCode: 201,
      success: true,
      message: "Admin created successfully",
      data: result,
   });
});

export const UserController = { createStudent, createFaculty, createAdmin };
