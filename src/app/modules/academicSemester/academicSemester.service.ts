import { SemesterCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (
   payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
   if (SemesterCodeMapper[payload.name] !== payload.code) {
      throw new Error("Semester code is not valid");
   }

   const result = await AcademicSemester.create(payload);
   return result;
};

const getAllAcademicSemestersFromDB = async (): Promise<
   IAcademicSemester[]
> => {
   const result = await AcademicSemester.find();
   return result;
};

const getSingleAcademicSemesterFromDB = async (
   id: string,
): Promise<IAcademicSemester | null> => {
   const result = await AcademicSemester.findById(id);
   return result;
};

export const AcademicSemesterService = {
   createAcademicSemesterIntoDB,
   getSingleAcademicSemesterFromDB,
   getAllAcademicSemestersFromDB,
};
