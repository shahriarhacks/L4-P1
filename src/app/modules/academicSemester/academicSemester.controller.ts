import asyncHandler from "../../utils/asyncHandler";
import responder from "../../utils/responder";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = asyncHandler(async (req, res) => {
   const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
      req.body,
   );
   responder(res, {
      statuscode: 201,
      success: true,
      message: "Academic Semester created successfully",
      data: result,
   });
});

const getSingleStudent = asyncHandler(async (req, res) => {
   const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(
      req.params.id,
   );
   responder(res, {
      statuscode: 200,
      success: true,
      data: result,
   });
});

const getAllAcademicSemesters = asyncHandler(async (req, res) => {
   const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
   responder(res, {
      statuscode: 200,
      success: true,
      data: result,
   });
});

export const AcademicSemesterController = {
   createAcademicSemester,
   getSingleStudent,
   getAllAcademicSemesters,
};
