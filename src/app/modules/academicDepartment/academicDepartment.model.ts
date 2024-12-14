import { model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import ApplicationError from "../../errors/ApplicationError";

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

// academicDepartmentSchema.pre("save", async function (next) {
//    const isDepartmentExist = await AcademicDepartment.findOne({
//       name: this.name,
//    });
//    if (isDepartmentExist) {
//       throw new ApplicationError(409, "Department already exist");
//    }
//    next();
// });

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
   const query = this.getQuery();
   const isDepartmentExist = await AcademicDepartment.findOne(query);
   if (!isDepartmentExist) {
      throw new ApplicationError(404, "Department not found");
   }
   next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
   "AcademicDepartment",
   academicDepartmentSchema,
);
