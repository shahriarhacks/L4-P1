import asyncHandler from "../../utils/asyncHandler";
import responder from "../../utils/responder";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = asyncHandler(async (req, res) => {
   const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
   );
   responder(res, {
      statusCode: 201,
      success: true,
      message: "Academic faculty created successfully",
      data: result,
   });
});

const getSingleAcademicFaculty = asyncHandler(async (req, res) => {
   const result = await AcademicFacultyService.getSingleFacultyFromDB(
      req.params.id,
   );
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty fetched successfully",
      data: result,
   });
});

const getAllAcademicFaculty = asyncHandler(async (_req, res) => {
   const result = await AcademicFacultyService.getAllFacultyFromDB();
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Academic faculty fetched successfully",
      data: result,
   });
});

const updateAcademicFaculty = asyncHandler(async (req, res) => {
   const result = await AcademicFacultyService.updateFacultyIntoDB(
      req.params.id,
      req.body,
   );
   responder(res, {
      statusCode: 201,
      success: true,
      message: "Academic faculty updated successfully",
      data: result,
   });
});

export const AcademicFacultyController = {
   createAcademicFaculty,
   getSingleAcademicFaculty,
   getAllAcademicFaculty,
   updateAcademicFaculty,
};
