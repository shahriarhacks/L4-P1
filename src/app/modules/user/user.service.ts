import { environment } from "../../../config/environment";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: IStudent) => {
   const userData: Partial<IUser> = {};

   const admissionSemester = await AcademicSemester.findOne({
      _id: payload.admissionSemester,
   });
   if (!admissionSemester) {
      throw new Error("Invalid Admission semester!");
   }

   userData.uid = await generateStudentId(admissionSemester);
   userData.password = password || (environment.student_def_pass as string);
   userData.role = "student";

   const user = await User.create(userData);
   if (Object.keys(user).length) {
      payload.user = user._id;
      payload.uid = user.uid;

      const createdStudent = await Student.create(payload);
      return createdStudent;
   }
   return undefined;
};

export const UserService = { createStudentIntoDB };
