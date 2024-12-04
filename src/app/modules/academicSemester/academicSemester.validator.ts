import { z } from "zod";
import {
   Months,
   SemesterCodes,
   SemesterNames,
} from "./academicSemester.constant";

const createSchema = z.object({
   body: z.object({
      name: z.enum(SemesterNames as [string, ...string[]]),
      year: z.string({
         required_error: "Year is required",
      }),
      code: z.enum(SemesterCodes as [string, ...string[]]),
      startMonth: z.enum(Months as [string, ...string[]]),
      endMonth: z.enum(Months as [string, ...string[]]),
   }),
});

export const AcademicSemesterValidator = {
   createSchema,
};
