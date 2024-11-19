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
      id: {
         type: String,
         required: true,
      },
      name: userNameSchema,
      gender: {
         type: String,
         enum: ["male", "female"],
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
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: {
         type: String,
      },
      isActive: {
         type: String,
         enum: ["active", "blocked"],
         default: "active",
      },
   },
   {
      timestamps: true,
   },
);
