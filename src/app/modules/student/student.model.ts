import { Schema, model } from "mongoose";
import {
   IGuardian,
   ILocalGuardian,
   IStudent,
   IUserName,
} from "./student.interface";

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const userNameSchema = new Schema<IUserName>({
   firstName: {
      type: String,
      required: true,
   },
   middleName: String,
   lastName: {
      type: String,
      required: true,
   },
});

const guardianSchema = new Schema<IGuardian>({
   fatherName: {
      type: String,
      required: true,
   },
   fatherOccupation: {
      type: String,
      required: true,
   },
   fatherContactNo: {
      type: String,
      required: true,
   },
   motherName: {
      type: String,
      required: true,
   },
   motherOccupation: {
      type: String,
      required: true,
   },
   motherContactNo: {
      type: String,
      required: true,
   },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
   name: {
      type: String,
      required: true,
   },
   occupation: {
      type: String,
      required: true,
   },
   contactNo: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
});

const studentSchema = new Schema<IStudent>(
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
         unique: true,
      },
      name: {
         type: userNameSchema,
         required: true,
      },
      gender: {
         type: String,
         enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender",
         },
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
         unique: true,
      },
      bloodGroup: {
         type: String,
         enum: {
            values: bloodGroup,
            message: "{VALUE} is not a valid blood group",
         },
      },
      presentAddress: {
         type: String,
         required: true,
      },
      permanentAddress: {
         type: String,
         required: true,
      },
      guardian: {
         type: guardianSchema,
         required: true,
      },
      localGuardian: {
         type: localGuardianSchema,
         required: true,
      },
      profileImg: {
         type: String,
      },
      isDeleted: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   },
);

// Query Middleware
studentSchema.pre("find", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

studentSchema.pre("findOne", function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
});

studentSchema.pre("aggregate", function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
   next();
});

export const Student = model<IStudent>("Student", studentSchema);
