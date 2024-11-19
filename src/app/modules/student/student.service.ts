import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudent = async (student: IStudent): Promise<IStudent> => {
   const result = await Student.create(student);
   return result;
};

export const StudentServices = {
   createStudent,
};
