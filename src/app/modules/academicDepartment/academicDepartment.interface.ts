import { Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export interface IAcademicDepartment {
   name: string;
   academicFaculty: Types.ObjectId | IAcademicFaculty;
}
