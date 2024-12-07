import { model, Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";
import {
   Months,
   SemesterCodes,
   SemesterNames,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<IAcademicSemester>(
   {
      name: {
         type: String,
         required: true,
         enum: SemesterNames,
      },
      year: {
         type: String,
         required: true,
      },
      code: {
         type: String,
         required: true,
         enum: SemesterCodes,
      },
      startMonth: {
         type: String,
         required: true,
         enum: Months,
      },
      endMonth: {
         type: String,
         required: true,
         enum: Months,
      },
   },
   {
      timestamps: true,
   },
);

academicSemesterSchema.pre("save", async function (next) {
   const isExist = await AcademicSemester.findOne({
      year: this.year,
      name: this.name,
   });

   if (isExist) {
      throw new Error("Academic Semester already exist");
   }
   next();
});

export const AcademicSemester = model<IAcademicSemester>(
   "AcademicSemester",
   academicSemesterSchema,
);
