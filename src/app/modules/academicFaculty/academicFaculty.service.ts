import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (
   payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
   // logic to create academic faculty into DB
   const result = await AcademicFaculty.create(payload);
   return result;
};

const getSingleFacultyFromDB = async (
   id: string,
): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.findById(id);
   return result;
};

const getAllFacultyFromDB = async (): Promise<IAcademicFaculty[]> => {
   const result = await AcademicFaculty.find();
   return result;
};

const updateFacultyIntoDB = async (
   id: string,
   payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
      new: true,
   });
   return result;
};

export const AcademicFacultyService = {
   createAcademicFacultyIntoDB,
   getSingleFacultyFromDB,
   getAllFacultyFromDB,
   updateFacultyIntoDB,
};
