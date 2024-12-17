import { model, Schema } from "mongoose";
import { IAdmin } from "./admin.interface";
import { bloodGroup, userNameSchema } from "../student/student.model";

const adminSchema = new Schema<IAdmin>({
   uid: { type: String, required: true, unique: true },
   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   designation: { type: String, required: true },
   name: {
      type: userNameSchema,
      required: true,
   },
   gender: { type: String, enum: ["male", "female", "other"], required: true },
   dateOfBirth: { type: String },
   email: { type: String, required: true, unique: true },
   contactNo: { type: String, required: true, unique: true },
   emergencyContactNo: { type: String, required: true },
   bloodGroup: { type: String, enum: bloodGroup },
   presentAddress: { type: String, required: true },
   permanentAddress: { type: String, required: true },
   profileImg: { type: String },
   managementDepartment: { type: String },
   isDeleted: { type: Boolean, default: false },
});
// generating full name
adminSchema.virtual("fullName").get(function () {
   return (
      this?.name?.firstName +
      "" +
      this?.name?.middleName +
      "" +
      this?.name?.lastName
   );
});

// filter out deleted documents
adminSchema.pre("find", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

adminSchema.pre("findOne", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

adminSchema.pre("aggregate", function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
   next();
});

export const Admin = model<IAdmin>("Admin", adminSchema);
