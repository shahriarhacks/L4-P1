import asyncHandler from "../../utils/asyncHandler";
import responder from "../../utils/responder";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = asyncHandler(async (req, res) => {
   const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
   );
   responder(res, {
      statuscode: 201,
      success: true,
      message: "Academic faculty created successfully",
      data: result,
   });
});

export const AcademicFacultyController = {
   createAcademicFaculty,
};
