/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { environment } from "../../../config/environment";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import {
   generateAdminId,
   generateFacultyId,
   generateStudentId,
} from "./user.utils";
import ApplicationError from "../../errors/ApplicationError";
import { Faculty } from "../faculty/faculty.model";
import { IFaculty } from "../faculty/faculty.interface";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
   const userData: Partial<IUser> = {};

   const admissionSemester = await AcademicSemester.findOne({
      _id: payload.admissionSemester,
   });
   if (!admissionSemester) {
      throw new ApplicationError(400, "Invalid Admission semester!");
   }

   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      userData.uid = await generateStudentId(admissionSemester);
      userData.password = password || (environment.student_def_pass as string);
      userData.role = "student";

      const user = await User.create([userData], { session });
      if (!user.length) {
         throw new ApplicationError(
            400,
            "User not created, Something went wrong!",
         );
      }
      payload.user = user[0]._id;
      payload.uid = user[0].uid;

      const createdStudent = await Student.create([payload], { session });
      if (!createdStudent.length) {
         throw new ApplicationError(
            400,
            "Student not created, Something went wrong!",
         );
      }

      await session.commitTransaction();

      return createdStudent[0];
   } catch (error: any) {
      await session.abortTransaction();
      throw new ApplicationError(400, error.message);
   } finally {
      await session.endSession();
   }
};

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
   const userData: Partial<IUser> = {};
   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      userData.uid = await generateFacultyId();
      userData.password = password || (environment.faculty_def_pass as string);
      userData.role = "faculty";

      const user = await User.create([userData], { session });
      if (!user.length) {
         throw new ApplicationError(
            400,
            "User not created, Something went wrong!",
         );
      }
      payload.user = user[0]._id;
      payload.uid = user[0].uid;

      const createdFaculty = await Faculty.create([payload], { session });
      if (!createdFaculty.length) {
         throw new ApplicationError(
            400,
            "Faculty not created, Something went wrong!",
         );
      }

      await session.commitTransaction();

      return createdFaculty[0];
   } catch (error: any) {
      await session.abortTransaction();
      throw new ApplicationError(400, error.message);
   } finally {
      await session.endSession();
   }
};

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
   const userData: Partial<IUser> = {};
   const session = await mongoose.startSession();

   try {
      session.startTransaction();
      userData.uid = await generateAdminId();
      userData.password = password || (environment.admin_def_pass as string);
      userData.role = "admin";

      const user = await User.create([userData], { session });
      if (!user.length) {
         throw new ApplicationError(
            400,
            "User not created, Something went wrong!",
         );
      }
      payload.user = user[0]._id;
      payload.uid = user[0].uid;

      const createdAdmin = await Admin.create([payload], { session });
      if (!createdAdmin.length) {
         throw new ApplicationError(
            400,
            "Admin not created, Something went wrong!",
         );
      }

      await session.commitTransaction();

      return createdAdmin[0];
   } catch (error: any) {
      await session.abortTransaction();
      throw new ApplicationError(400, error.message);
   } finally {
      await session.endSession();
   }
};

export const UserService = {
   createStudentIntoDB,
   createFacultyIntoDB,
   createAdminIntoDB,
};
