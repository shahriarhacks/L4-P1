/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from "./student.model";
import { IStudent } from "./student.interface";
import mongoose from "mongoose";
import ApplicationError from "../../errors/applicationError";
import { User } from "../user/user.model";

const getSingleStudent = async (uid: string): Promise<IStudent> => {
   const result = await Student.findOne({ uid })
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      })
      .populate("admissionSemester");
   if (!result) {
      throw new ApplicationError(404, "Student not found");
   }
   return result;
};

const getAllStudents = async (): Promise<IStudent[]> => {
   const result = await Student.find()
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      })
      .populate("admissionSemester");
   return result;
};

const updateStudent = async (
   uid: string,
   payload: Partial<IStudent>,
): Promise<IStudent | null> => {
   const { name, guardian, localGuardian, ...remaining } = payload;
   const modifiedPayload: Record<string, unknown> = { ...remaining };
   if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
         modifiedPayload[`name.${key}`] = value;
      }
   }
   if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
         modifiedPayload[`guardian.${key}`] = value;
      }
   }
   if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
         modifiedPayload[`localGuardian.${key}`] = value;
      }
   }
   const updatedStudent = await Student.findOneAndUpdate(
      { uid },
      { $set: modifiedPayload },
      { new: true, runValidators: true },
   );
   return updatedStudent;
};

const deleteStudentFromDB = async (uid: string): Promise<IStudent | null> => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();
      const deletedStudent = await Student.findOneAndUpdate(
         { uid },
         { isDeleted: true },
         { new: true, session },
      );
      if (!deletedStudent) {
         throw new ApplicationError(404, "Student not found");
      }
      const deletedUser = await User.findOneAndUpdate(
         { uid },
         { isDeleted: true },
         { new: true, session },
      );
      if (!deletedUser) {
         throw new ApplicationError(404, "User not found");
      }

      await session.commitTransaction();

      return deletedStudent;
   } catch (error: any) {
      await session.abortTransaction();
      throw new ApplicationError(400, error.message);
   } finally {
      await session.endSession();
   }
};

export const StudentService = {
   getSingleStudent,
   getAllStudents,
   deleteStudentFromDB,
   updateStudent,
};
