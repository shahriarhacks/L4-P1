import asyncHandler from "../../utils/asyncHandler";
import responder from "../../utils/responder";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = asyncHandler(async (req, res) => {
   const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);

   responder<IAcademicDepartment>(res, {
      statusCode: 201,
      success: true,
      message: "Academic Department created successfully",
      data: result,
   });
});

const getSingleAcademicDepartment = asyncHandler(async (req, res) => {
   const result =
      await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
         req.params.id,
      );
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department fetched successfully",
      data: result,
   });
});

const getAllAcademicDepartment = asyncHandler(async (req, res) => {
   const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
   responder(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department fetched successfully",
      data: result,
   });
});

const updateAcademicDepartment = asyncHandler(async (req, res) => {
   const result =
      await AcademicDepartmentService.updateAcademicDepartmentIntoDB(
         req.params.id,
         req.body,
      );
   responder(res, {
      statusCode: 201,
      success: true,
      message: "Academic Department updated successfully",
      data: result,
   });
});

export const AcademicDepartmentController = {
   createAcademicDepartment,
   getSingleAcademicDepartment,
   getAllAcademicDepartment,
   updateAcademicDepartment,
};
