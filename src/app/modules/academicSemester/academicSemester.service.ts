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

export const AcademicSemesterService = { createAcademicSemesterIntoDB };
