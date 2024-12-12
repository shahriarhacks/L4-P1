import asyncHandler from "../../utils/asyncHandler";
import responder from "../../utils/responder";
import { IStudent } from "./student.interface";
import { StudentService } from "./student.service";

const getSingleStudent = asyncHandler(async (req, res) => {
   const result = await StudentService.getSingleStudent(req.params.uid);
   responder<IStudent | null>(res, {
      statusCode: 200,
      success: true,
      message: "Student fetched successfully",
      data: result,
   });
});

const getAllStudents = asyncHandler(async (req, res) => {
   const result = await StudentService.getAllStudents();
   responder<IStudent[]>(res, {
      statusCode: 200,
      success: true,
      message: "Students fetched successfully",
      data: result,
   });
});

const updateStudent = asyncHandler(async (req, res) => {
   const result = await StudentService.updateStudent(req.params.uid, {
      ...req.body,
   });
   responder<IStudent | null>(res, {
      statusCode: 201,
      success: true,
      message: "Student updated successfully",
      data: result,
   });
});

const deletedStudent = asyncHandler(async (req, res) => {
   const result = await StudentService.deleteStudentFromDB(req.params.uid);

   responder<IStudent | null>(res, {
      statusCode: 200,
      success: true,
      message: "Student deleted successfully",
      data: result,
   });
});

export const StudentController = {
   getSingleStudent,
   getAllStudents,
   deletedStudent,
   updateStudent,
};
