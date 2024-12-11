import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (
   payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
   // logic to create academic department into DB
   const result = (await AcademicDepartment.create(payload)).populate(
      "academicFaculty",
   );
   return result;
};
const getSingleAcademicDepartmentFromDB = async (
   id: string,
): Promise<IAcademicDepartment | null> => {
   // logic to get single academic department from DB
   const result =
      await AcademicDepartment.findById(id).populate("academicFaculty");
   return result;
};

const getAllAcademicDepartmentFromDB = async (): Promise<
   IAcademicDepartment[]
> => {
   // logic to get all academic department from DB
   const result = await AcademicDepartment.find().populate("academicFaculty");
   return result;
};

const updateAcademicDepartmentIntoDB = async (
   id: string,
   payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
   // logic to update academic department into DB
   const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
      new: true,
   }).populate("academicFaculty");
   return result;
};

export const AcademicDepartmentService = {
   createAcademicDepartmentIntoDB,
   getSingleAcademicDepartmentFromDB,
   getAllAcademicDepartmentFromDB,
   updateAcademicDepartmentIntoDB,
};
