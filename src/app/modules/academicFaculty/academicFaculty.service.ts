import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (
   payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
   // logic to create academic faculty into DB
   const result = await AcademicFaculty.create(payload);
   return result;
};

export const AcademicFacultyService = {
   createAcademicFacultyIntoDB,
};
