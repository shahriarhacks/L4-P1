import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
   {
      name: {
         type: String,
         required: true,
         minlength: 3,
         trim: true,
         unique: true,
      },
      academicFaculty: {
         type: Schema.Types.ObjectId,
         ref: "AcademicFaculty",
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

export const AcademicDepartment = model<IAcademicDepartment>(
   "AcademicDepartment",
   academicDepartmentSchema,
);
