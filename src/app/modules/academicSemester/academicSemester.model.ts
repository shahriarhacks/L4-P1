import { model, Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";
import {
   Months,
   SemesterCodes,
   SemesterNames,
} from "./academicSemester.constant";
import ApplicationError from "../../errors/applicationError";

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
      throw new ApplicationError(409, "Academic Semester already exist");
   }
   next();
});

academicSemesterSchema.pre("findOneAndUpdate", async function (next) {
   const query = this.getQuery();
   const isExist = await AcademicSemester.findOne(query);
   if (!isExist) {
      throw new ApplicationError(404, "Academic Semester not found");
   }
   next();
});

export const AcademicSemester = model<IAcademicSemester>(
   "AcademicSemester",
   academicSemesterSchema,
);
