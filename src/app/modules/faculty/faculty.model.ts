import { model, Schema } from "mongoose";
import { IFaculty } from "./faculty.interface";
import { bloodGroup, userNameSchema } from "../student/student.model";

const facultySchema = new Schema<IFaculty>(
   {
      uid: {
         type: String,
         required: true,
         unique: true,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      designation: {
         type: String,
         required: true,
         trim: true,
      },
      name: {
         type: userNameSchema,
         required: true,
      },
      gender: {
         type: String,
         enum: ["male", "female", "other"],
         required: true,
      },
      dateOfBirth: {
         type: String,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      contactNo: {
         type: String,
         required: true,
         unique: true,
      },
      emergencyContactNo: {
         type: String,
         required: true,
      },
      bloodGroup: {
         type: String,
         enum: bloodGroup,
      },
      presentAddress: {
         type: String,
         required: true,
      },
      permanentAddress: {
         type: String,
         required: true,
      },
      profileImg: {
         type: String,
      },
      academicDepartment: {
         type: Schema.Types.ObjectId,
         ref: "AcademicDepartment",
         required: true,
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

// filter out deleted documents
facultySchema.pre("find", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

facultySchema.pre("findOne", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

facultySchema.pre("aggregate", function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
   next();
});

export const Faculty = model<IFaculty>("Faculty", facultySchema);
