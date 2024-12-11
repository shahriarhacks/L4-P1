import { model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";
import ApplicationError from "../../errors/applicationError";

const academicFacultySchema = new Schema<IAcademicFaculty>(
   {
      name: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
   },
   { timestamps: true },
);

academicFacultySchema.pre("save", async function (next) {
   const isFacultyExist = await AcademicFaculty.findOne({
      name: this.name,
   });
   if (isFacultyExist) {
      throw new ApplicationError(409, "Faculty already exist");
   }
   next();
});

academicFacultySchema.pre("findOneAndUpdate", async function (next) {
   const query = this.getQuery();
   const isFacultyExist = await AcademicFaculty.findOne(query);
   if (!isFacultyExist) {
      throw new ApplicationError(404, "Faculty not found");
   }
   next();
});
export const AcademicFaculty = model<IAcademicFaculty>(
   "AcademicFaculty",
   academicFacultySchema,
);
