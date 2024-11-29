import { environment } from "../../../config/environment";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudent = async (password: string, student: IStudent) => {
   const userData: Partial<IUser> = {};

   userData.uid = "20300100001";
   userData.password = password || (environment.student_def_pass as string);
   userData.role = "student";

   const user = await User.create(userData);
   if (Object.keys(user).length) {
      student.user = user._id;
      student.uid = user.uid;

      const createdStudent = await Student.create(student);
      return createdStudent;
   }
   return undefined;
};

export const UserService = { createStudent };
