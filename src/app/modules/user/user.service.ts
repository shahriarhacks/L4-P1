import mongoose from "mongoose";
import { environment } from "../../../config/environment";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import ApplicationError from "../../errors/ApplicationError";

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
      await session.startTransaction();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      await session.abortTransaction();
      throw new ApplicationError(400, error.message);
   } finally {
      await session.endSession();
   }
};

export const UserService = { createStudentIntoDB };
