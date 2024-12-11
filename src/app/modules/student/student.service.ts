import { Student } from "./student.model";
import { IStudent } from "./student.interface";

const getSingleStudent = async (uid: string): Promise<IStudent | null> => {
   const result = await Student.findOne({ uid })
      .populate({
         path: "academicDepartment",
         populate: {
            path: "academicFaculty",
         },
      })
      .populate("admissionSemester");
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

export const StudentService = { getSingleStudent, getAllStudents };
