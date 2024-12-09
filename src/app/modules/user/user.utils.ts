import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
   // Find the last student id in the database
   const lastStudent = await User.findOne(
      { role: "student" },
      { uid: 1, _id: 0 },
   )
      .sort({ createdAt: -1 })
      .lean();

   return lastStudent?.uid ? lastStudent.uid : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
   let currentId = (0).toString();
   const lastStudentId = await findLastStudentId();

   const lastStudentYear = lastStudentId?.substring(0, 4);
   const lastStudentCode = lastStudentId?.substring(4, 6);

   if (
      lastStudentId &&
      lastStudentYear === payload.year &&
      lastStudentCode === payload.code
   ) {
      currentId = lastStudentId.substring(6);
   }
   const ongoingStudentId = (Number(currentId) + 1).toString().padStart(4, "0");
   const studentID = `${payload.year}${payload.code}${ongoingStudentId}`;
   return studentID;
};
